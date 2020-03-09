// const User = require("../models/User")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const validator = require("validator")
// const { transporter, getPasswordResetURL, resetPasswordTemplate } = require("../utils/mailer")
 
// module.exports = {

//     createResetPasswordTokenAndSendMail: (req, res) => {
//         const email = req.params.email
//             User.findOne({ email }, (err, user) => {
//                 if (err) console.log(err)
//                 // res.json({user})
//                 const hashedPassword = user.password
//                 const createdAt = user.createdAt
//                 const userId = user._id
//                 // console.log(user.password, user.createdAt, userId )
//                 const secret = hashedPassword + "-" + createdAt 
//                 const token = jwt.sign({ userId }, secret, {
//                     expiresIn: 3600
//                 })
//                 // console.log(token)
//                 // console.log(user)
//                 const url = getPasswordResetURL(user, token) 
//                 // console.log(url)
//                 const emailTemplate = resetPasswordTemplate(user, url)
//                 console.log(emailTemplate, "l26")

//                 const sendEmail = () => {
//                     transporter.sendMail(emailTemplate, (err, info) => {
//                         if (err) console.log(err)
//                         // console.log(info, "L31")
//                         console.log("email sent successfully", info.response)
//                     })
//                 }
//                 sendEmail()
//         })
//     },

//     // sendPasswordResetEmail: (req, res) => {
//     //     User.findOne({email}, (err, user) => {
//     //         if (err) console.log(err)
            
//     //     })



//     // }

    
















// }