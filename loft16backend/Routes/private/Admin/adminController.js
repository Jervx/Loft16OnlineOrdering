const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminAuth = require("../../../middleware/adminAuth");
const Courier = require("../../../models/Courier");
const Admin = require("../../../models/Admin");
const Product = require("../../../models/Product");
const InProgress = require("../../../models/Orders_In_Progress");
const Completed = require("../../../models/Completed_Orders");
const Pendings = require("../../../models/Pending_Order");
const Categories = require("../../../models/Categories");

let ObjectId = require("mongoose").Types.ObjectId;

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
    res.status(500).json({
      status: 500,
      description: "internal server error",
      solution: "There's an error within the system, try again later",
    });
    console.log(e);
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
    res.status(500).json({
      status: 500,
      description: "internal server error",
      solution: "Please contact server admin or try again later",
    });
    console.log("ERR", err);
  }
});

router.get("/mydetails/:id", adminAuth, async (req, res) => {
  let _id = req.params.id;
  console.log("ADMIN Detail request", _id);
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

    // TODO: Left Over

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
    console.log(err);
    res.status(500).json({
      status: 500,
      description: "Internal Server Error",
      solution: "Sorry but the server has an error, please try again later",
    });
  }
});

router.get("/couriers", adminAuth, async (req, res) => {
  try {
    const couriers = await Courier.find({ dat: null });

    res.status(200).json({ msg: "ok!", Couriers: couriers });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      description: "Internal Server Error",
      solution: "Sorry but the server has an error, please try again later",
    });
  }
});

router.get("/categories", adminAuth, async (req, res) => {
  try {

    const categories = await Categories.find({})

    res.status(200).json({
        message : 'ok!',
        categories
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      description: "Internal Server Error",
      solution: "Sorry but the server has an error, please try again later",
    });
  }
});

module.exports = router;
