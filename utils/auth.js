const jwt = require("jsonwebtoken")

function signToken(payload) {
    return jwt.sign(payload, process.env.JWTSECRET)
}

function verifyToken(req, res, next) {
    console.log(req,'hhfhfhhgxjxjxrddyd')
    const token = req.headers.Authorization || req.headers.authorization || ""
    if (!token) {
        return res.status(403).json({ error: "Not authorized"})
    }

    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Not authorized" })
        }

        req.user = decoded
        console.log(req.user, decoded)
        next()
    })
}


module.exports = { signToken, verifyToken }