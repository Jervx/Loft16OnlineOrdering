const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Courier = require("../../../models/Courier");
const bcrypt = require("bcryptjs");

const adminAuth = require("../../../middleware/adminAuth");
const Corier = require("../../../models/Courier");
const Admin = require("../../../models/Admin");


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

module.exports = router;
