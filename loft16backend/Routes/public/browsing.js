const express = require("express");
const { Mongoose } = require("mongoose");
const router = express.Router();
const Product = require("../../models/Product");
let ObjectId = require("mongoose").Types.ObjectId;

// NOTE: Loft16 Getting hot product
router.get("/gethotproducts", async (req, res) => {
  try {
    const hotProducts = await Product.find({ is_hot: true }).sort({ cat: 1 });
    return res.status(200).json(hotProducts);
  } catch (e) {
    return res.cookie(500).json({
      err: 500,
      description: "Internal Server Error",
      solution: "Please contact admin or try again later",
    });
  }
});

// NOTE: Loft16 getproduct
router.post("/getproduct", async (req, res) => {
  const itemName = req.body.userSearch;
  const filters = req.body.filter;

  let products = [];

  if (itemName && itemName.length !== 0)
    products = await Product.find({
      name: { $regex: ".*" + itemName + ".*", $options: "i" },
    });
  else if (filters.max !== 0)
    products = await Product.find({}).limit(filters.max);
  else products = await Product.find({});

  let finalRes = [];
  if (filters.scope !== "all")
    products.forEach((product, idx) => {
      let isMatched = false;
      product.categories.forEach((cat) => {
        if (cat.toLowerCase() === filters.scope.toLowerCase()) isMatched = true;
      });
      if (isMatched) finalRes.push(product);
    });
  else finalRes = products;

  finalRes.sort((a, b) =>
    a.variants[0].price > b.variants[0].price
      ? 1
      : b.variants[0].price > a.variants[0].price
      ? -1
      : 0
  );

  return res.status(200).json({
    msg: "Ok! 👌",
    products: finalRes,
  });
});

// NOTE: DONE
router.get("/getproductdetail/:id", async (req, res) => {
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

module.exports = router;
