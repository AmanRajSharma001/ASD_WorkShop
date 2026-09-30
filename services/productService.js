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

async function updateProduct(id, name, price) {
    const products = await delayReadData()
    const product = products.find((product) => product.id == id)
    if (!product) {
        return null
    }
    product.name = name
    product.price = Number(price)
    await writeData(products)
    return product
}

async function patchProduct(id, name, price) {
    const products = await delayReadData()
    const product = products.find((product) => product.id == id)
    if (!product) {
        return null
    }
    if (name !== undefined) {
        product.name = name
    }
    if (price !== undefined) {
        product.price = Number(price)
    }
    await writeData(products)
    return product
}

async function deleteProduct(id) {
    const products = await delayReadData()
    const index = products.findIndex((product) => product.id == id)
    if (index === -1) {
        return null
    }
    const deletedProduct = products[index]
    products.splice(index, 1)
    await writeData(products)
    return deletedProduct
}

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,patchProduct,deleteProduct}