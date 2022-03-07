require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const Orders = require("../../../models/Orders");

const adminAuth = require("../../../middleware/adminAuth");
const Courier = require("../../../models/Courier");
const Admin = require("../../../models/Admin");
const Product = require("../../../models/Product");
const InProgress = require("../../../models/Orders_In_Progress");
const Completed = require("../../../models/Completed_Orders");
const Pendings = require("../../../models/Pending_Order");
const Categories = require("../../../models/Categories");
const User = require("../../../models/User");
const Chat = require("../../../models/Chat");

const { ehandler, checkObjectId } = require("../../../helper/utils");
let ObjectId = require("mongoose").Types.ObjectId;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./static/profile`);
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${uuidv4()}-${file.originalname}`);
  },
});

var upload = multer({ storage: storage, limits: { fileSize: 8388608 } });

router.post(
  "/uploadAdminProfile",
  adminAuth,
  upload.single("profile_picture", 5),
  async (req, res) => {
    try {
      const { _id } = req.body;

      let uploadInfo = req.file;

      console.log(uploadInfo);

      if (_id) {
        const updateAdminData = await Admin.updateOne(
          { _id },
          {
            $set: {
              profile_picture: `${process.env.SELFURL}/${uploadInfo.path}`,
            },
          }
        );
      }

      res.status(200).json({
        message: "ok!",
        uploadInfo,
      });
    } catch (e) {
      ehandler(e, res);
    }
  }
);

var productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./static/product`);
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString()}-${uuidv4()}-${file.originalname}`);
  },
});

var productUpload = multer({
  storage: productStorage,
  limits: { fileSize: 8388608 },
}).array("fileImages", 12);

router.get("/getproductdetail/:id", adminAuth, async (req, res) => {
  try {
    const _id = req.params.id;

    if (!_id)
      return res.status(400).json({
        err: 400,
        description: "Required Data Missing",
        solution: "Please input all required data",
      });

    const productData = await Product.findOne({
      _id: new ObjectId(_id),
      dat: null,
    });

    if (!productData)
      return res.status(400).json({
        err: 400,
        description: "Product Not Found",
        solution: "The product might be unavailable/deleted by the Admin",
      });

    res.status(200).json({
      ok: "Found 👍",
      productData: {
        ...productData.toObject(),
      },
    });
  } catch (err) {
    return res.status(400).json({
      err: 500,
      description: "Internal Server Error",
      solution:
        "Sorry! Something's wrong with the server, please try again later or contact loft16 admin",
    });
  }
});

router.post(
  "/uploadProductImage",
  adminAuth,
  productUpload,
  async (req, res) => {
    try {
      const { _id, prod_Id } = req.body;

      let newImages = [];

      let filesSaved = Array.from(req.files);

      for (let x = 0; x < filesSaved.length; x++)
        newImages.push(`${process.env.SELFURL}/${filesSaved[x].path}`);

      const update = await Product.updateOne(
        {
          _id: new ObjectId(prod_Id),
        },
        {
          $push: {
            Images: { $each: newImages },
          },
          $set: {
            uby: new ObjectId(_id),
            uat: new Date(),
          },
        }
      );

      res.status(200).json({ message: "uploaded!" });
    } catch (e) {
      ehandler(e, res);
    }
  }
);

router.post("/updateProduct", adminAuth, async (req, res) => {
  try {
    const { mode, _id, prod_Id, simpleData, complexData } = req.body;

    console.log(mode);

    if (mode === 0) {
      const doesExist = await Product.findOne({
        name: simpleData.name,
      });

      if (doesExist)
        return res.status(401).json({
          code: 401,
          message: "Admin Conflict",
          description: "Product with thesame name already exist",
          solution: "Please use another product name",
        });

      const product = await Product.create({
        ...simpleData,
        cby: new ObjectId(_id),
      });

      complexData.newCategories.forEach(async (name) => {
        const updateCat = await Categories.updateOne(
          {
            category_name: name,
          },
          {
            $push: {
              associated_products: new ObjectId(product._id),
            },
          }
        );
      });

      const updateAdd = await Product.updateOne(
        {
          _id: product._id,
        },
        {
          $set: {
            ...simpleData,
          },
          $push: {
            categories: {
              $each: complexData.newCategories,
            },
            variants: complexData.newVariants,
          },
        }
      );

      const currentProductData = await Product.findOne(
        { _id: product._id },
        { variants: 1 }
      );
      let total_stock = 0;
      currentProductData.variants.forEach((vari) => {
        total_stock += Number.parseFloat(vari.stock);
      });

      const updateStock = await Product.updateOne(
        {
          _id: product._id,
        },
        {
          $set: {
            total_stock,
          },
        }
      );

      return res.status(200).json(product);
    } else if (mode === 1) {
      const doesExist = await Product.findOne({
        name: simpleData.name,
      });

      if (doesExist)
        return res.status(401).json({
          code: 401,
          message: "Admin Conflict",
          description: "Product with thesame name already exist",
          solution: "Please use another product name",
        });

      const delCat = complexData.deletedCategories;

      delCat.forEach(async (name) => {
        const updateCat = await Categories.updateOne(
          {
            categoy_name: name,
          },
          {
            $pull: {
              associated_products: new ObjectId(prod_Id),
            },
          }
        );
      });

      complexData.newCategories.forEach(async (name) => {
        const updateCat = await Categories.updateOne(
          {
            category_name: name,
          },
          {
            $push: {
              associated_products: new ObjectId(prod_Id),
            },
          }
        );
      });

      const updateDelete = await Product.updateOne(
        {
          _id: prod_Id,
        },
        {
          $pull: {
            Images: {
              $in: complexData.deletedImages,
            },
            categories: {
              $in: delCat,
            },
            variants: {
              name: {
                $in: complexData.deletedVariants,
              },
            },
          },
        }
      );

      const updateAdd = await Product.updateOne(
        {
          _id: prod_Id,
        },
        {
          $set: {
            ...simpleData,
          },
          $push: {
            categories: {
              $each: complexData.newCategories,
            },
            variants: complexData.newVariants,
          },
        }
      );

      const currentProductData = await Product.findOne(
        { _id: prod_Id },
        { variants: 1 }
      );
      let total_stock = 0;
      currentProductData.variants.forEach((vari) => {
        total_stock += Number.parseFloat(vari.stock);
      });

      const updateStock = await Product.updateOne(
        {
          _id: prod_Id,
        },
        {
          $set: {
            total_stock,
            uat: new Date(),
            uby: new ObjectId(_id),
          },
        }
      );
    } else if (mode === -1) {
      const data = await Product.findOne({ _id: prod_Id });

      let cats = data.categories;

      cats.forEach(async (name) => {
        await Categories.updateOne(
          { category_name: name },
          {
            $pull: {
              associated_products: new ObjectId(prod_Id),
            },
          }
        );
      });

      const update = await Product.deleteOne({ _id: prod_Id });
    }

    res.status(200).json({
      message: "ok!",
    });
  } catch (e) {
    ehandler(e, res);
  }
});

// Chats
router.get("/getChat", adminAuth, async (req, res) => {
  try {
    const conversations = await Chat.find({
      messages: { $not: { $size: 0 } },
    }).sort({ hasNewMessage: -1 });

    res.status(200).json({
      conversations,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

router.post("/seenConversation", adminAuth, async (req, res) => {
  try {
    const { user_id } = req.body;

    const seen = await Chat.updateOne(
      { user_id },
      {
        $set: {
          hasNewMessage: false,
        },
      }
    );

    res.status(200).json({
      message: "ok",
    });
  } catch (e) {}
});

router.post("/deleteConversation", adminAuth, async (req, res) => {
  try {
    const { user_id } = req.body;

    const seen = await Chat.deleteOne({ user_id });

    res.status(200).json({
      message: "ok, deleted",
    });
  } catch (e) {}
});

router.post("/sendMessage", adminAuth, async (req, res) => {
  try {
    const { _id, message } = req.body;

    console.log(message, _id)

    const sendMessage = await Chat.updateOne(
      { user_id: _id },
      {
        $push: {
          messages: message,
        },
      }
    );

    const conversation = await Chat.findOne({ user_id: _id });

    res.status(201).json({
      message: "sent",
      conversation,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

// admin account creation &
router.get("/mydetails/:id", adminAuth, async (req, res) => {
  let _id = req.params.id;

  if (!_id)
    return res.status(400).json({
      err: 400,
      description: "Missing Required Fields",
      solution: "Please provide required fields",
    });
  _id = mongoose.Types.ObjectId(_id);
  const adminData = await Admin.findOne({ _id }, { password: 0 }).lean();
  if (!adminData)
    return res.status(404).json({
      err: 404,
      description: "Admin not found",
      solution: "Admin is not registered",
    });
  return res.status(200).json({
    status: "200 : ok 👌",
    adminData,
  });
});

// admin route pages data reqsts ---------------------------
router.post("/insights", adminAuth, async (req, res) => {
  try {
    const { year } = req.body;

    let topProducts = await Product.find(
      { generated_sale: { $gt: 0 } },
      { name: 1, likes: 1, generated_sale: 1, Images: 1, total_item_sold: 1 }
    )
      .sort({ generated_sale: -1 })
      .limit(15);

    let pendings = await Pendings.find({}).count();
    let inprogress = await InProgress.find({}).count();
    let completed = await Completed.find({}).count();
    let products = await Product.find({}).count();
    let available = await Product.find({ total_stock: { $gt: 0 } }).count();

    let categories = await Categories.find({});

    console.log("Querying Year :", year);

    let delivered = await Orders.find({
      order_status: 3,
      uat: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
    });
    let cancelled = await Orders.find({
      order_status: -1,
      uat: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`),
      },
    });

    res.status(200).json({
      msg: "ok!",
      topProducts,
      stats: {
        total_pending_orders: pendings,
        total_in_progress: inprogress,
        total_completed: completed,
        total_products: products,
        total_available_products: available,
      },
      categories,
      delivered,
      cancelled,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

// couriers page & actions ---------------------------
router.get("/couriers", adminAuth, async (req, res) => {
  try {
    const couriers = await Courier.find({ dat: null });

    res.status(200).json({ msg: "ok!", Couriers: couriers });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/updateCourier", adminAuth, async (req, res) => {
  try {
    const { _id, courier, oldCourier, mode } = req.body;

    let status = 403;
    let message = "";
    let description = "";
    let solution = "";

    //  mode 0 create, mode 1 update, mode -1 delete
    if (mode === 0) {
      const nameAlreadyExist = await Courier.findOne({
        courier_name: courier.courier_name,
      });

      if (nameAlreadyExist) {
        status = 409;
        message = "courier already exist";
        description = "conflict";
        solution = "use other courier name";
        return res.status(409).json({
          status,
          message,
          description,
          solution,
        });
      }

      const update = await Courier.create({
        ...courier,
        cby: new ObjectId(_id),
        uby: new ObjectId(_id),
      });

      message = "Updated";
      status = 201;
    } else if (mode === 1) {
      const nameAlreadyExist = await Courier.findOne({
        courier_name: courier.courier_name,
      });
      const doesCurrentRecordExist = await Courier.findOne({
        _id: oldCourier._id,
      });

      if (!doesCurrentRecordExist) {
        status = 404;
        message = "That courier is not found";
        description = "Not Found";
        solution = "No Solution";
        return res.status(409).json({
          status,
          message,
          description,
          solution,
        });
      }

      if (nameAlreadyExist)
        if (!nameAlreadyExist._id.equals(doesCurrentRecordExist._id)) {
          status = 409;
          message = "That name is already taken by other courier";
          description = "Conflict";
          solution = "Choose another name that is not taken";
          return res.status(409).json({
            status,
            message,
            description,
            solution,
          });
        }

      const update = await Courier.updateOne(
        {
          ...oldCourier,
        },
        {
          $set: {
            ...courier,
            uby: new ObjectId(_id),
            uat: new Date(),
          },
        }
      );

      message = "Updated";
      status = 201;
    } else if (mode === -1) {
      const update = await Courier.deleteOne({
        _id: oldCourier._id,
      });

      status = 200;
      message = "ok!";
    } else {
      message = "No mode of update specified";
      status = 403;
    }

    res.status(status).json({
      status,
      message,
      description,
      solution,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

// categories page & actions ---------------------------
router.get("/categories", adminAuth, async (req, res) => {
  try {
    const categories = await Categories.find({});

    res.status(200).json({
      message: "ok!",
      categories,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/searchCategory", adminAuth, async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await Categories.find({
      category_name: { $regex: ".*" + category_name + ".*", $options: "i" },
    });

    return res.status(200).json({
      message: "ok",
      categories: category,
    });
  } catch (e) {
    ehandler(err, res);
  }
});

router.post("/updateCategories", adminAuth, async (req, res) => {
  try {
    const { _id, category, oldCategory, mode } = req.body;

    let status = 403;
    let message = "";
    let description = "";
    let solution = "";

    console.log(category, oldCategory, mode);

    //  mode 0 create, mode 1 update, mode -1 delete
    if (mode === 0) {
      const nameAlreadyExist = await Categories.findOne({
        category_name: category.category_name,
      });

      if (nameAlreadyExist)
        return res.status(409).json({
          status: 409,
          message: "Category Name already taken",
          description: "Conflict",
          solution: "Please choose another category name",
        });

      const update = await Categories.create({
        ...category,
        cby: new ObjectId(_id),
        uby: new ObjectId(_id),
      });

      status = 201;
      message = "ok!";
      description = "created";
    } else if (mode === 1) {
      const nameAlreadyExist = await Categories.findOne({
        category_name: category.category_name,
      });
      const doesCurrentRecordExist = await Categories.findOne({
        _id: oldCategory._id,
      });

      if (!doesCurrentRecordExist) {
        status = 404;
        message = "That category is not found";
        description = "Not Found";
        solution = "No Solution";
        return res.status(409).json({
          status,
          message,
          description,
          solution,
        });
      }

      if (nameAlreadyExist)
        if (!nameAlreadyExist._id.equals(doesCurrentRecordExist._id)) {
          status = 409;
          message = "That category name is already created";
          description = "Conflict";
          solution = "Choose another name that is not taken";
          return res.status(409).json({
            status,
            message,
            description,
            solution,
          });
        }

      const update = await Categories.updateOne(
        {
          ...oldCategory,
        },
        {
          $set: {
            ...category,
            uby: new ObjectId(_id),
            uat: new Date(),
          },
        }
      );

      message = "Updated";
      status = 201;
    } else if (mode === -1) {
      const update = await Categories.deleteOne({ _id: oldCategory._id });

      status = 200;
      message = "ok!";
    } else {
      message = "No mode of update specified";
      status = 403;
    }

    res.status(status).json({
      status,
      message,
      description,
      solution,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

// pending page & actions ---------------------------
router.get("/pendings", adminAuth, async (req, res) => {
  try {
    let pendings = [];

    pendings = await Pendings.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_ID",
          foreignField: "_id",
          as: "user_profile",
        },
      },
      { $unwind: "$user_profile" },
      {
        $lookup: {
          from: "orders",
          localField: "order_ID",
          foreignField: "_id",
          as: "order_detailed_version",
        },
      },
      { $unwind: "$order_detailed_version" },
    ]);

    let profiles = [];

    res.status(200).json({
      message: "ok!",
      pendings,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/updatePending", adminAuth, async (req, res) => {
  try {
    let { _id, mode, entry, reason } = req.body;

    const doesExist = await Pendings.findOne({ _id: entry._id });

    if (!doesExist)
      return res.status(404).json({
        status: 404,
        description:
          "This order is not in pending, maybe the admin is now processing it or it was already cancelled",
        solution:
          "We cannot update it's status, were syncing your current data",
      });

    // mode = 0 - move to in progress, -1 - cancel
    // NOTE: 0 pending, 1 processing, 2 Shipped, 3 delivered, -1 cancelled

    if (mode === 0) {
      let record = doesExist.toObject();
      delete record._id;

      // get all products from order
      const items = await Orders.findOne({ _id: entry.order_ID }, { items: 1 });
      let extractedItems = items.items;

      // update products being chosen
      extractedItems.forEach(async (item) => {
        const updateProduct = await Product.updateOne(
          {
            _id: item.product_ID,
            "variants.name": item.variant,
          },
          {
            $inc: { "variants.$.stock": -item.qty, total_stock: -item.qty },
          }
        );
      });

      const updateInProgress = await InProgress.create({ ...record });

      // set the main record of order to in progress
      const updateOrders = await Orders.updateOne(
        { _id: doesExist.order_ID },
        {
          $set: { order_status: 1, uby: new ObjectId(_id), uat: new Date() },
        }
      );

      // get the user short version data of its order
      const userPendingData = await User.findOne(
        {
          _id: doesExist.user_ID,
          "pending_orders.order_ID": doesExist.order_ID,
        },
        {
          _id: 0,
          pending_orders: { $elemMatch: { order_ID: doesExist.order_ID } },
        }
      );

      // obtain user small version record of the order
      let extracted = userPendingData.pending_orders[0];

      // update user small version record of pendings
      // remove the record from pending array & pushing sa in progress array
      const updateUserData = await User.updateOne(
        { _id: doesExist.user_ID },
        {
          $pull: {
            pending_orders: { order_ID: new ObjectId(doesExist.order_ID) },
          },
          $push: {
            in_progress: {
              ...extracted,
              order_status: 1,
              dat: new Date(),
            },
          },
        }
      );

      // remove record from pening collection
      const updatePending = await Pendings.deleteOne({
        order_ID: entry.order_ID,
      });
    } else if (mode === -1) {
      // check if order_ID is still in pending order collection

      const check_pending_order = await Pendings.findOne({
        order_ID: entry.order_ID,
      });

      if (!check_pending_order)
        res.status(404).json({
          status: 404,
          description:
            "This order is not in pending, maybe the admin is now processing it or it was already cancelled",
          solution:
            "We cannot cancel this anymore so we will sync your current data",
        });

      const delete_pending_order = await Pendings.deleteOne({
        order_ID: entry.order_ID,
      });

      const updatedOrderEntry = await Orders.updateOne(
        { _id: entry.order_ID },
        {
          $set: {
            order_status: -1,
            reason,
            uby: new ObjectId(_id),
            uat: new Date(),
          },
        }
      );

      // get the user short version data of its order
      const userPendingData = await User.findOne(
        {
          _id: doesExist.user_ID,
          "pending_orders.order_ID": doesExist.order_ID,
        },
        {
          _id: 0,
          pending_orders: { $elemMatch: { order_ID: doesExist.order_ID } },
        }
      );

      // obtain user small version record of the order
      let extracted = userPendingData.pending_orders[0];

      // if not, just update the user pending_orders
      const updateUserData = await User.updateOne(
        { _id: entry.user_ID },
        {
          $pull: { pending_orders: { order_ID: new ObjectId(entry.order_ID) } },
          $push: {
            cancelled: {
              ...extracted,
              order_status: -1,
              dat: new Date(),
              reason,
            },
          },
        }
      );
    }

    res.status(200).json({
      message: "ok!",
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/searchPendingOrders", adminAuth, async (req, res) => {
  try {
    let { order_ID } = req.body;

    if (!checkObjectId(order_ID))
      return res.status(200).json({
        message: "ok",
        pendings: [],
      });

    let pendings = await Pendings.aggregate([
      {
        $match: {
          order_ID: new ObjectId(order_ID),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_ID",
          foreignField: "_id",
          as: "user_profile",
        },
      },
      { $unwind: "$user_profile" },
      {
        $lookup: {
          from: "orders",
          localField: "order_ID",
          foreignField: "_id",
          as: "order_detailed_version",
        },
      },
      { $unwind: "$order_detailed_version" },
    ]);

    let toFind = [];

    res.status(200).json({
      message: "ok!",
      pendings,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

// in progress page & actions ---------------------------
router.get("/inProgress", adminAuth, async (req, res) => {
  try {
    let inProgress = [];

    inProgress = await InProgress.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_ID",
          foreignField: "_id",
          as: "user_profile",
        },
      },
      { $unwind: "$user_profile" },
      {
        $lookup: {
          from: "orders",
          localField: "order_ID",
          foreignField: "_id",
          as: "order_detailed_version",
        },
      },
      { $unwind: "$order_detailed_version" },
    ]);

    let profiles = [];

    res.status(200).json({
      message: "ok!",
      inProgress,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/updateInProgress", adminAuth, async (req, res) => {
  try {
    const { _id, mode, entry, status, entry_sm } = req.body;

    const PRESENT = await InProgress.findOne({ order_ID: entry_sm.order_ID });

    if (!PRESENT)
      return res.status(404).json({
        status: 404,
        message: "Not Found",
        description: "This order has been removed",
        solution: "Reload Page",
      });

    // mode === 0 mark as complete
    if (mode === 0) {
      const NewCompletedEntry = await Completed.create({
        ...entry_sm,
        uat: new Date(),
        uby: new ObjectId(_id),
      });

      let toRate = [];

      const ITEMS = entry.order_detailed_version.items;

      ITEMS.forEach(async (item, idx) => {
        toRate.push(new ObjectId(item.product_ID));
        const updateProduct = await Product.updateOne(
          {
            _id: item.product_ID,
          },
          {
            $inc: {
              total_item_sold: item.qty,
              generated_sale: item.qty * item.variant_price,
            },
          }
        );
      });

      const updateUser = await User.updateOne(
        {
          _id: entry_sm.user_ID,
        },
        {
          $pull: {
            in_progress: { order_ID: new ObjectId(entry_sm.order_ID) },
          },
          $inc: {
            n_completed_orders: 1,
            n_completed_transaction: 1,
          },
          $push: {
            past_transactions: {
              order_ID: new ObjectId(entry.order_ID),
              n_items: entry.n_items,
              total_cost: entry.total_cost,
              courier: entry.courier.courier_name,
              cat: new Date(),
            },
            to_rate: {
              $each: toRate,
            },
          },
        }
      );

      const updateOrder = await Orders.updateOne(
        {
          _id: entry_sm.order_ID,
        },
        {
          $set: {
            uat: new Date(),
            order_status: status,
          },
        }
      );

      const updateCourier = await Courier.updateOne(
        {
          courier_name: entry.order_detailed_version.courier.courier_name,
        },
        {
          $inc: {
            total_delivered_orders: 1,
          },
          $push: {
            delivered_orders: new ObjectId(entry.order_detailed_version._id),
          },
        }
      );

      const deleteEntry = await InProgress.deleteOne({
        order_ID: entry_sm.order_ID,
      });
    } else {
      // update user in_progress order status to status

      const updateUser = await User.updateOne(
        {
          _id: new ObjectId(entry.user_ID),
          "in_progress.order_ID": new ObjectId(entry.order_ID),
        },
        {
          $set: {
            "in_progress.$.order_status": status,
          },
        }
      );

      console.log(
        updateUser,
        "Setting status to ",
        status,
        entry.user_ID,
        entry.order_ID
      );

      const updateOrder = await Orders.updateOne(
        {
          _id: entry.order_ID,
        },
        {
          $set: {
            order_status: status,
            uby: new ObjectId(_id),
            uat: new Date(),
          },
        }
      );
    }

    res.status(201).json({
      message: "ok!",
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/searchInProgress", adminAuth, async (req, res) => {
  try {
    let { order_ID } = req.body;

    if (!checkObjectId(order_ID))
      return res.status(200).json({
        message: "ok",
        inprogress: [],
      });

    let inprogress = await InProgress.aggregate([
      {
        $match: {
          order_ID: new ObjectId(order_ID),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_ID",
          foreignField: "_id",
          as: "user_profile",
        },
      },
      { $unwind: "$user_profile" },
      {
        $lookup: {
          from: "orders",
          localField: "order_ID",
          foreignField: "_id",
          as: "order_detailed_version",
        },
      },
      { $unwind: "$order_detailed_version" },
    ]);

    let toFind = [];

    res.status(200).json({
      message: "ok!",
      inprogress,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

// completed orders page & actions ----------------------

router.get("/completed", adminAuth, async (req, res) => {
  try {
    let completed = [];

    completed = await Completed.aggregate([
      { $match: { dat: null } },
      {
        $lookup: {
          from: "users",
          localField: "user_ID",
          foreignField: "_id",
          as: "user_profile",
        },
      },
      { $unwind: "$user_profile" },
      {
        $lookup: {
          from: "orders",
          localField: "order_ID",
          foreignField: "_id",
          as: "order_detailed_version",
        },
      },
      { $unwind: "$order_detailed_version" },
    ]);

    res.status(200).json({
      message: "ok!",
      completed,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

router.post("/deleteCompleted", adminAuth, async (req, res) => {
  try {
    const { order_ID } = req.body;

    const del = await Completed.deleteOne({ order_ID: new ObjectId(order_ID) });

    console.log(del);
    res.status(200).json({
      message: "Ok",
      del,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

router.post("/searchCompleted", adminAuth, async (req, res) => {
  try {
    const { order_ID } = req.body;

    if (!checkObjectId(order_ID))
      return res.status(200).json({
        message: "ok",
        completed: [],
      });

    const completed = await Completed.aggregate([
      {
        $match: { order_ID: new ObjectId(order_ID) },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_ID",
          foreignField: "_id",
          as: "user_profile",
        },
      },
      { $unwind: "$user_profile" },
      {
        $lookup: {
          from: "orders",
          localField: "order_ID",
          foreignField: "_id",
          as: "order_detailed_version",
        },
      },
      { $unwind: "$order_detailed_version" },
    ]);

    res.status(200).json({
      message: "ok",
      completed,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

// admins page & actions ---------------------------------
router.get("/admins", adminAuth, async (req, res) => {
  try {
    const admins = await Admin.find({});

    res.status(200).json({
      message: "ok",
      admins,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

router.post("/loadAdminData", adminAuth, async (req, res) => {
  try {
    const { _id } = req.body;
    const adminData = await Admin.findOne({
      _id,
    });

    res.status(200).json({
      message: "ok!",
      adminData,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.post("/updateAdmin", adminAuth, async (req, res) => {
  try {
    const { _id, mode, info, isChangedPass } = req.body;
    //name, email_address, role, password

    if (mode === 0) {
      const hashedPassword = await bcrypt.hash(info.password, 10);

      const adminExist = await Admin.findOne({
        email_address: info.email_address,
      });

      if (adminExist)
        return res.status(401).json({
          code: 401,
          message: "Admin Conflict",
          description: "Admin with that email address already exist",
          solution: "Please use other email address",
        });

      const adminData = await Admin.create({
        ...info,
        password: hashedPassword,
        uby: new ObjectId(_id),
      });
    } else if (mode === 1) {
      let hashed = info.password;

      let additional = {};

      if (isChangedPass) {
        console.log("Password Changing");
        additional.password = await bcrypt.hash(info.password, 10);
      }

      const updateData = await Admin.updateOne(
        {
          _id: info._id,
        },
        {
          $set: {
            ...info,
            ...additional,
            uby: new ObjectId(_id),
            uat: new Date(),
          },
        }
      );
    } else {
      const deleteData = await Admin.deleteOne({
        _id: info._id,
      });
    }

    res.status(201).json({
      message: "Ok!",
    });
  } catch (e) {
    ehandler(e, res);
  }
});

// user page & actions -----------------------------------
// router.get("/users", adminAuth, async (req, res) => {
//   try {
//     const users = await User.find({}, { password: 0 });

//     res.status(200).json({
//       message: "ok!",
//       users,
//     });
//   } catch (e) {
//     ehandler(e, res);
//   }
// });

// product page & actions --------------------------------

router.get("/products", adminAuth, async (req, res) => {
  try {
    const products = await Product.find({});
    const cat = await Categories.find({});

    res.status(200).json({
      message: "ok",
      products,
      cat,
    });
  } catch (e) {
    ehandler(e, res);
  }
});

module.exports = router;
