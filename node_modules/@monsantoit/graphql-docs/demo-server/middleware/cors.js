const cors = require('cors')

module.exports = (req, res, next) => {
    const middleware = cors({
        origin: (origin, callback) => {callback(null, true)}
    })

    res.set('Access-Control-Allow-Credentials', true)
    return middleware(req, res, next)
}