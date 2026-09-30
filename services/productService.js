const {readData,writeData,delayReadData} = require("../database/productDatabase")

async function getAllProducts() {
    return await delayReadData()
}

async function getProductById(id) {
    const products = await delayReadData()
    return products.find((product) => product.id == id)
}

async function createProduct(name, price) {
    const products = await delayReadData()
    const product = {
        id: products.length + 1,
        name,
        price: Number(price)
    }
    products.push(product)
    await writeData(products)
    return product
}

module.exports = {getAllProducts,getProductById,createProduct}