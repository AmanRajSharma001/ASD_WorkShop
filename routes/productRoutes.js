const express = require("express")
const router = express.Router()

const {getProducts,getProduct,postProduct,putProduct,patchProductController} = require("../controllers/productController")

const {cacheMiddleware} = require("../middleware/cacheMiddleware")

router.get("/products", cacheMiddleware, getProducts)
router.get("/products/:id", cacheMiddleware, getProduct)

router.post("/products", postProduct)
router.put("/products/:id", putProduct)
router.patch("/products/:id", patchProductController)


module.exports = router