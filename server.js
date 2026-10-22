const express = require("express")
const {apiPulse} = require("apipulse-express")
const app = express()
const port = 3000

const productRoutes = require("./routes/productRoutes")

app.use(express.json())
app.use(apiPulse)
app.use("/", productRoutes)

app.listen(port, () => {
    console.log(`Server Running on PORT:${port}`)
})