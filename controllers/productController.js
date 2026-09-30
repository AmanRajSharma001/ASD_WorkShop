const {getAllProducts,getProductById,createProduct,updateProduct} = require("../services/productService")

const { clearCache } = require("../middleware/cacheMiddleware")

async function getProducts(req, res) {
    try {
        const products = await getAllProducts()
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function getProduct(req, res) {
    const id = Number(req.params.id)
    try {
        const product = await getProductById(id)
        if (!product) {
            return res.status(404).json({
                error: `Product with id: ${id} not found!`
            })
        }
        return res.status(200).json(product)
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

async function postProduct(req, res) {
    try {
        const { name, price } = req.body
        const product = await createProduct(name, price)
        clearCache()
        return res.status(201).json(product)
    } catch (err) {
        return res.status(400).json({
            error: "Data is invalid"
        })
    }
}

async function putProduct(req, res) {
    const id = Number(req.params.id)
    try {
        const { name, price } = req.body
        const product = await updateProduct(id, name, price)
        if (!product) {
            return res.status(404).json({
                error: `Product with id: ${id} not found!`
            })
        }
        clearCache()
        return res.status(200).json(product)
    } catch (err) {
        return res.status(400).json({
            error: "Data is invalid"
        })
    }
}

module.exports = {getProducts,getProduct,postProduct,putProduct}