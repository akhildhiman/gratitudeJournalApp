// const nodemailer = require("nodemailer")

// transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })

// getPasswordResetURL = (user, token) => {
//     `http://localhost:3000/password/reset/${user._id}/${token}`
// }

// resetPasswordTemplate = (user, url) => {
//     const from = process.env.EMAIL
//     const to = user.email
//     const subject = "Password Reset"
//     const html = `
//         <p>Hey ${user.name || user.email},</p>
//         <p>We heard that you forgot your password. Sorry about that!</p>
//         <p>But don’t worry! You can use the following link to reset your password:</p>
//         <a href=${url}>${url}</a>
//         <p>If you don’t use this link within 1 hour, it will expire.</p>
//     `
// }

// module.exports = { transporter, getPasswordResetURL, resetPasswordTemplate }