const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;

const User = require("../../../models/User");
const auth = require("../../../middleware/auth");
const Order = require("../../../models/Orders");
const Pending_Order = require("../../../models/Pending_Order");

// 👌 TODO: Should update the total items & total cost
router.post("/addToCart", auth, async (req, res) => {
  let { _id, item } = req.body;
  _id = mongoose.Types.ObjectId(_id);
  item.product_ID = mongoose.Types.ObjectId(item.product_ID);
  const result = await User.updateOne(
    { _id },
    {
      $push: { "cart.items": item },
      $inc: {
        "cart.total_items": 1,
        "cart.total_cost": item.variant_price * item.qty,
      },
    }
  );
  res.status(200).json({
    status: 200,
    description: "Item added to cart",
    ...result,
  });
});

router.post("/removeCancelled", auth, async (req,res)=>{
    try{
        const { _id, cancelled } = req.body

        const removedRecord = await User.updateOne({_id}, {
            $pull : { cancelled : { order_ID : cancelled.order_ID } }
        })

        res.status(200).json({
            status: 200,
            description: "Record removed"
          });

    }catch(e){
        res.status(500).json({
            status: 500,
            description: "internal server error",
            solution: "Please contact server admin or try again later",
          });
          console.log("ERR", e);
    }
})

router.post("/removeCompleted", auth, async (req,res)=>{
    try{
        const { _id, completed } = req.body

        const removedRecord = await User.updateOne({_id}, {
            $pull : { past_transactions : {
                order_ID : new ObjectId(completed.order_ID)
            } }
        })

        res.status(200).json({
            status: 200,
            description: "Record removed"
          });

    }catch(e){
        res.status(500).json({
            status: 500,
            description: "internal server error",
            solution: "Please contact server admin or try again later",
          });
          console.log("ERR", e);
    }
})


router.post("/cancelOrder", auth, async (req, res) => {
  try {
    const { _id, order_object, order_ID} = req.body;

    // check if order_ID is still in pending order collection

    const check_pending_order = await Pending_Order.findOne({ order_ID });

    if (!check_pending_order)
      res.status(404).json({
        status: 404,
        description:
          "This order is not in pending, maybe the admin is now processing it or it was already cancelled",
        solution: "We cannot cancel this anymore",
      });

    const delete_pending_order = await Pending_Order.deleteOne({ order_ID });

    const updatedOrderEntry = await Order.updateOne(
      { _id: order_ID },
      {
        $set: {
          order_status: -1,
          reason: "Cancelled by User",
        }
      }
    );

    // if not, just update the user pending_orders

    const updateUserData = await User.updateOne(
      { _id },
      {
        $pull : { pending_orders : {  order_ID : new ObjectId(order_ID) } },
        $push : {
            cancelled : {...order_object, order_status : -1, dat : new Date(), reason : "Cancelled by you" }
        }
      }
    );

    res.status(200).json({
        status : 200,
        message : "Order Cancelled Successfuly"
    })

  } catch (err) {
    res.status(500).json({
      status: 500,
      description: "internal server error",
      solution: "Please contact server admin or try again later",
    });
    console.log("ERR", e);
  }
});

router.post("/placeOrder", auth, async (req, res) => {
  try {
    let { _id, order } = req.body;

    const userData = await User.findOne({ _id });

    if (!userData) {
      return res.status(404).json({
        status: 404,
        description: "User not found",
        solution: "You are not registered in our database",
      });
    }

    const user_order = await Order.create({
      ...order,
      user_ID: new ObjectId(_id),
    });

    const user_pending_order = await Pending_Order.create({
      order_ID: new ObjectId(user_order._id),
      user_ID: new ObjectId(_id),
      user_email: userData.email_address,
      n_items: order.n_items,
      total_cost: order.total_cost,
      courier: order.courier,
    });

    const newUserData = await User.updateOne(
      { _id },
      {
        $set: {
          cart: {
            total_items: 0,
            total_cost: 0,
            items: [],
          },
        },
        $push: {
          pending_orders: {
            order_ID: new ObjectId(user_order._id),
            total_cost: order.total_cost,
            courier: order.courier.courier_name,
            n_items: order.n_items,
            cat: new Date(),
          },
        },
      }
    );

    res.status(201).json({
      status: 201,
      message: "Order Placed!",
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

router.post("/updatecart", auth, async (req, res) => {
  try {
    let { _id, cart } = req.body;
    _id = mongoose.Types.ObjectId(_id);
    console.log("THISCART", cart);

    const result = await User.updateOne(
      { _id },
      {
        $set: {
          cart: cart,
        },
      }
    );
    res.status(200).json({
      status: 200,
      description: "Item removed from cart",
      ...result,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      description: "internal server error",
      solution: "Please contact server admin or try again later",
    });
    console.log("ERR", e);
  }
});

//remove a specific item from cart
router.post("/removefromcart", auth, async (req, res) => {
  try {
    let { _id, item } = req.body;
    _id = mongoose.Types.ObjectId(_id);
    item.product_ID = mongoose.Types.ObjectId(item.product_ID);
    const itemExist = await User.findOne({ _id }, { cart: 1 }).lean();
    if (itemExist.cart.total_items === 0)
      return res.status(200).json({
        status: 200,
        description: "No item to remove",
      });
    const result = await User.updateOne(
      { _id },
      {
        $pull: { "cart.items": { product_ID: item.product_ID } },
        $inc: {
          "cart.total_items": -1,
          "cart.total_cost": -(item.variant_price * item.qty),
        },
      }
    );
    res.status(200).json({
      status: 200,
      description: "Item removed from cart",
      ...result,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      description: "internal server error",
      solution: "Please contact server admin or try again later",
    });
  }
});

//getUserDetails
router.get("/mydetails/:id", auth, async (req, res) => {
  let _id = req.params.id;
  if (!_id)
    return res.status(400).json({
      err: 400,
      description: "Missing Required Fields",
      solution: "Please provide required fields",
    });
  _id = mongoose.Types.ObjectId(_id);
  const userData = await User.findOne({ _id }, {password : 0}).lean();
  if (!userData)
    return res.status(404).json({
      err: 404,
      description: "User not found",
      solution: "User is not registered",
    });
  return res.status(200).json({
    status: "200 : ok 👌",
    userData,
  });
});

//getUserCart
router.get("/mycart/:_id", auth, async (req, res) => {
  let _id = req.params._id;
  // if id is null return 400
  if (!_id)
    return res.status(400).json({
      err: 400,
      description: "Missing Required Fields",
      solution: "Please provide required fields",
    });
  _id = mongoose.Types.ObjectId(_id);
  // get user mycart
  const userCart = await User.findOne({ _id }, { _id: 0, cart: 1 }).lean();
  // check if items stock, variant. name & price exist or changes
  // if it does change then update that item
  res.status(200).json(userCart);
  // else return the cart data
});

module.exports = router;
