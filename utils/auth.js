const jwt = require("jsonwebtoken")

function signToken(payload) {
    // console.log("inside signToken")
    // console.log("payload->", payload, "secret->", process.env.JWTSECRET)
    return jwt.sign(payload, process.env.JWTSECRET)
}

function verifyToken(req, res, next) {
    // console.log("4-> inside verify token")
    const token = req.headers.Authorization || req.headers.authorization || ""
    // console.log("4-> inside verifyToken")
    if (!token) {
        return res.status(403).json({ error: "Not authorized"})
    }

    jwt.verify(token, process.env.JWTSECRET, (err, decodedObj) => {
        if (err) {
            return res.status(403).json({ error: "Not authorized" })
        }

        req.user = decodedObj
        // console.log("5=>", "user object->",req.user, "decoded object->", decodedObj)
        next()  
    })
}


module.exports = { signToken, verifyToken }