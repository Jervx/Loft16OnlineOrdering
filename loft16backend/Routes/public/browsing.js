const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

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
  else if (filters.max !== 0) products = await Product.find({}).limit(filters.max);
  else products = await Product.find({})

  let finalRes = []
  console.log("RECIEVED FILTERS",filters)
  if(filters.scope !== 'all')
    products.forEach((product, idx)=>{
        let isMatched = false
        product.categories.forEach((cat)=>{
            if(cat.toLowerCase() === filters.scope.toLowerCase())
                isMatched = true
        })
        if(isMatched)
            finalRes.push(product)
    })
  else finalRes = products

  finalRes.sort((a,b) => (a.variants[0].price > b.variants[0].price) ? 1 : ((b.variants[0].price > a.variants[0].price) ? -1 : 0))

  return res.status(200).json({
    msg: "Ok! 👌",
    products : finalRes,
  });
});

// TODO: getproductdetails implement first on front end
// NOTE: No need auth
router.get("/getproductdetail/:id", (req, res) => {
  //TODO: requirement check
  res.status(200).json({
    ok: "product description",
  });
});

module.exports = router;
