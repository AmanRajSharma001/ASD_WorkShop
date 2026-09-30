const fs = require('fs/promises')
const path = require("path")
const express = require("express")
const app = express()
const port = 3000

const filePath = path.join(__dirname,"db.json")

app.use(express.json())

async function readData(){
    const data = await fs.readFile(filePath,'utf-8')
    return JSON.parse(data)
}

async function delayReadData(){
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })
    return await readData();
}

let cache = {}

app.get('/products', async (req, res) => {
    try {
        if (cache.products) {
            return res.status(200).json(cache.products)
        }

        let products = await delayReadData()

        cache.products = products

        return res.status(200).json(products)

    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        })
    }
})

app.get('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        if (cache[id]){
            return res.status(200).json(cache[id])
        }

        const products = await delayReadData();
        const result = products.find((x) => x.id == id);
        cache[id] = result
        if (!result) {
            return res.status(404).json({
                error: `Product with id: ${id} not found!`
            });
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});


app.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body
        let result = await delayReadData()
        let data = {
            id: result.length + 1,
            name,
            price: Number(price)
        }
        result.push(data)
        await fs.writeFile(filePath,JSON.stringify(result),'utf-8')
        cache[data.id] = data
        delete cache.products
        return res.status(201).json(data)
    } catch (err) {
        return res.status(400).json({
            error: "Data is invalid"
        })
    }
})

app.listen(port,()=>{
   console.log("Server Running on PORT:3000") 
})