const cache = {}

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl

    if (cache[key]) {
        res.set("X-Cache", "HIT")
        return res.status(200).json(cache[key])
    }

    res.set("X-Cache", "MISS")

    res.sendResponse = res.json

    res.json = (data) => {
        cache[key] = data
        return res.sendResponse.call(res, data)
    }

    next()
}

module.exports = {cache,cacheMiddleware}