// const nodemailer = require("nodemailer")
// const nodemailMailGun = require("nodemailer-mailgun-transport")

// const auth = {
//   auth: {
//     api_key: "40a4d5aae9e79a2c6dd97368e1327e05-ed4dc7c4-209e3ee1",
//     domain: "sandbox94273252fedc48a5abaadc9f0b7ad76e.mailgun.org"
//   }
// }

// let transporter = nodemailer.createTransport(nodemailMailGun(auth))

// const getResetPasswordURL = (user, token) => {
//   return `http://localhost:3000/update-password/${user._id}/${token}`
// }

// const resetPasswordTemplate = (user, url) => {
//   const from = process.env.EMAIL
//   const to = user.email
//   const subject = "PASSWORD UPDATE EMAIL"
//   const text = "Reset your email"
//   const html = `This is your password reset url <a href=${url}>${url}</a>`

//   return { from, to, subject, text, html }
// }

// const confirmationEmailTemplate = (user) => {
//   const from = process.env.EMAIL
//   const to = user.email
//   const subject = "CONFIRMATION EMAIL"
//   const text = "Your password has been successfully updated"

//   return { from, to, subject, text }
// }

// module.exports = { transporter, getResetPasswordURL, resetPasswordTemplate, confirmationEmailTemplate }
