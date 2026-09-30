const {getAllProducts,getProductById,createProduct} = require("../services/productService")

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
        return res.status(201).json(product)
    } catch (err) {
        return res.status(400).json({
            error: "Data is invalid"
        })
    }
}

module.exports = {getProducts,getProduct,postProduct}