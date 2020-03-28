// const User = require("../models/User")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
// const {
//   transporter,
//   getResetPasswordURL,
//   resetPasswordTemplate,
//   confirmationEmailTemplate
// } = require("../utils/mailer")

// const receiveConfirmationEmail = ( userId ) => {
//   console.log("inside confirmation email", userId)
//   User.findOne({ _id: userId }, (err, user) => {
//     const emailTemplate = confirmationEmailTemplate(user)
//     if (err) console.log(err)
//     const sendEmail = () => {
//       transporter.sendMail(emailTemplate, (err) => {
//         if (err) console.log(err)
//       })
//     }
//     sendEmail()
//   })
// }

// module.exports = {
//   createOneTimeTokenAndSendMail: async (req, res) => {
//     const email = req.params.email
//     try {
//       const user = await User.findOne({ email })
//       if (!user) {
//         return res.status(404).json({ error: "No user with that email" })
//       }
//       const hashedPassword = user.password
//       const createdAt = user.createdAt
//       const userId = user._id
//       const secret = hashedPassword + "-" + createdAt
//       const token = jwt.sign({ userId }, secret, {
//         expiresIn: 60
//       })
//       const url = getResetPasswordURL(user, token)
//       const emailTemplate = resetPasswordTemplate(user, url)
//       const sendEmail = () => {
//         transporter.sendMail(emailTemplate, (err, info) => {
//           if (err) {
//             res.status(500).json({ error: err })
//           }
//         })
//       }
//       sendEmail()
//     } catch (error) {
//       console.log(error)
//     }
//   },

//   receiveNewPassword: (req, res) => {
//     const { userId, token } = req.params
//     const password = req.body.password
//     User.findOne({ _id: userId }, (err, user) => {
//       if (err) console.log(err)
//       const secret = user.password + "-" + user.createdAt
//       const payload = jwt.decode(token, secret)
//       if (payload.userId == user.id) {
//           bcrypt.genSalt(10, (err, salt) => {
//           if (err) console.log(err)
//           bcrypt.hash(password, salt, (err, hash) => {
//             if (err) console.log(err)
//             User.findOneAndUpdate({ _id: userId }, { password: hash }, (err) => {
//               if (err) console.log(err)
//               res.status(202).json("password changed")
//               receiveConfirmationEmail( userId )
//             })
//           })
//         })
//       }
//     })
//   }
// }
