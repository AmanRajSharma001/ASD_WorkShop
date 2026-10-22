import express from "express";
const app = express()
const port = 3000

import productRoutes from "./routes/productRoutes";

app.use(express.json())

app.use("/", productRoutes)

app.listen(port, () => {
    console.log(`Server Running on PORT:${port}`)
})