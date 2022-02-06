const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

const { ehandler } = require("../../../helper/utils");

let ObjectId = require("mongoose").Types.ObjectId;
const Orders_In_Progress = require("../../../models/Orders_In_Progress");

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

//admin account creation &
router.post("/updateAdmin", adminAuth, async (req, res) => {
  try {
    const { mode, info, isChangedPass } = req.body;

    if (mode === 0) {
      const hashedPassword = await bcrypt.hash(info.password, 10);

      const adminData = await Admin.create({
        ...info,
        password: hashedPassword,
      });
    } else if (mode === 1) {
      let hashed = info.password;

      if (isChangedPass) hashed = await bcrypt.hash(info.password, 10);

      const updateData = await Admin.updateOne(
        {
          _id: info._id,
        },
        {
          $set: { ...info, password: hashed },
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
          solution: "think another category name",
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

router.post("/searchPendingOrders", adminAuth, async (req, res) => {
  try {
    let propertiesToFind = req.body;

    let pendings = await Pendings.find({
      ...propertiesToFind,
    });

    let toFind = [];

    pendings.forEach((ids, idx) => {
      toFind.push(ids.order_ID);
    });

    pendings = await Orders.find({ _id: toFind });

    res.status(200).json({
      message: "ok!",
      pendings,
    });
  } catch (err) {
    ehandler(err, res);
  }
});

// admin route pages data reqsts
router.get("/insights", adminAuth, async (req, res) => {
  try {
    let topProducts = await Product.find(
      { generated_sale: { $gt: 0 } },
      { name: 1, likes: 1, generated_sale: 1, Images: 1, total_item_sold: 1 }
    ).sort({ generated_sale: -1 });

    let pendings = await Pendings.find({}).count();
    let inprogress = await InProgress.find({}).count();
    let completed = await Completed.find({}).count();
    let products = await Product.find({}).count();
    let available = await Product.find({ total_stock: { $gt: 0 } }).count();

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
    });
  } catch (err) {
    ehandler(err, res);
  }
});

router.get("/couriers", adminAuth, async (req, res) => {
  try {
    const couriers = await Courier.find({ dat: null });

    res.status(200).json({ msg: "ok!", Couriers: couriers });
  } catch (err) {
    ehandler(err, res);
  }
});

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

// pending page & actions
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
            $inc: { "variants.$.stock": -item.qty, total_stock : -item.qty },
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


// in progress page & actions
router.get("/inProgress", adminAuth, async (req, res) => {
    try{
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
    }catch(err){
        ehandler(err,res)
    }
})

router.post("/updateInProgress", adminAuth, async(req,res) => {
    try{
        
        const { _id, mode, entry ,status } = req.body
        
        // mode === 0 mark as complete
        if(mode === 0){

        }else{
            // mode === 1 
            
            // update user in_progress order status to status

            const updateUser = await User.updateOne({
                _id : entry.user_ID,
                "in_progress.order_ID" : entry.order_ID
              },{
                $set : {
                  "in_progress.$.order_status" : status
                }
              })

            const updateOrder = await Orders.updateOne({
                _id : entry.order_ID
            },{
                $set : {
                    order_status : status,
                    uby : new ObjectId(_id),
                    uat : new Date()
                }
            })
        }


        res.status(201).json({
            message : "ok!"
        })
    }catch(err){
        ehandler(err,res)
    }
})

module.exports = router;
