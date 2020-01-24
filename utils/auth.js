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

    jwt.verify(token, process.env.JWTSECRET, (err, decodedObj) => {
        if (err) {
            return res.status(403).json({ error: "Not authorized" })
        }

        req.user = decodedObj
        console.log(req.user, decodedObj)
        next()  
    })
}


module.exports = { signToken, verifyToken }