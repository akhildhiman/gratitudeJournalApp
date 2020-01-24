const jwt = require("jsonwebtoken")

function signToken(payload) {
    console.log("inside signToken")
    return jwt.sign(payload, process.env.JWTSECRET)
}

function verifyToken(req, res, next) {
    console.log("inside verifyToken")
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