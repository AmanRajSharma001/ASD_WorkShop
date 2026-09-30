const fs = require('fs/promises')
const path = require('path')

const filePath = path.join(__dirname,'db.json')

async function readData() {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
}

async function writeData(data) {
    await fs.writeFile(filePath,JSON.stringify(data),'utf-8')
}

async function delayReadData() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500)
    })

    return await readData()
}

module.exports = {readData,writeData,delayReadData}