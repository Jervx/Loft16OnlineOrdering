const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Courier = require("../../../models/Courier");
const bcrypt = require("bcryptjs");

const adminAuth = require("../../../middleware/adminAuth");
const Corier = require("../../../models/Courier");
const Admin = require("../../../models/Admin");
const Product = require("../../../models/Product")
const InProgress = require("../../../models/Orders_In_Progress")
const Completed = require("../../../models/Completed_Orders");
const Pendings = require("../../../models/Pending_Order")

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

router.post("/addCourier", adminAuth, async (req, res) => {
  try {
    const courier = req.body;

    // check if other corier with the same name exist

    // if yes return conflict

    // if not create

    const response = await Courier.create(courier);

    res.status(200).json({ msg: "ok!" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/mydetails/:id", adminAuth, async (req, res) => {
    let _id = req.params.id;
    console.log("ADMIN Detail request", _id)
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

router.get("/insights", adminAuth, async(req,res)=>{
    try {
        let topProducts = await Product.find({generated_sale : { $gt : 0 }},{name : 1, likes : 1, generated_sale : 1, Images : 1 , total_item_sold : 1}).sort({generated_sale : -1})

        let pendings = await Pendings.find({}).count()
        let inprogress = await InProgress.find({}).count()
        let completed = await Completed.find({}).count()
        let products = await Product.find({}).count()
        let available = await Product.find({total_stock : { $gt : 0}}).count()

        // TODO: Left Over

        res.status(200).json({
            msg: "ok!", 
            topProducts,
            stats : {
                total_pending_orders : pendings,
                total_in_progress : inprogress,
                total_completed : completed,
                total_products : products,
                total_available_products : available
            }
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
            status : 500,
            description : "Internal Server Error",
            solution : "Sorry but the server has an error, please try again later"
        })
      }
})

module.exports = router;
