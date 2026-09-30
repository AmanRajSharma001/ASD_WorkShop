const express = require("express")
const router = express.Router()

const {getProducts,getProduct,postProduct} = require("../controllers/productController")

router.get("/products", getProducts)
router.get("/products/:id", getProduct)
router.post("/products", postProduct)

module.exports = router