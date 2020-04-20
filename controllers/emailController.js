const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cron = require("node-cron")
const {
  transporter,
  getResetPasswordURL,
  resetPasswordTemplate,
  confirmationEmailTemplate,
  randomGratitudeTemplate,
} = require("../utils/mailer")

const receiveConfirmationEmail = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId })
    const emailTemplate = confirmationEmailTemplate(user)
    transporter.sendMail(emailTemplate, (err) => {
      if (err) {
        res.status(500).json({ Error: err })
      }
    })
    res.status(200).json({ info: info.response })
  } catch (err) {
    if (err) {
      console.log(err)
    }
  }
}

module.exports = {
  createOneTimeTokenAndSendMail: async (req, res) => {
    const email = req.params.email
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).json({ error: "No user with that email" })
      }
      const hashedPassword = user.password
      const createdAt = user.createdAt
      const userId = user._id
      const secret = hashedPassword + "-" + createdAt
      console.log("SECRET", secret)
      const token = jwt.sign({ userId }, secret, {
        expiresIn: 60,
      })
      const url = getResetPasswordURL(user, token)
      const emailTemplate = resetPasswordTemplate(user, url)
      transporter.sendMail(emailTemplate, (err, info) => {
        if (err) {
          res.status(500).json({ error: err })
        }
        res.status(200).json({ info: info.response })
      })
    } catch (error) {
      console.log(error)
    }
  },

  receiveNewPassword: (req, res) => {
    const { userId, token } = req.params
    const password = req.body.password
    User.findOne({ _id: userId }, (err, user) => {
      if (err) console.log(err)
      const secret = user.password + "-" + user.createdAt
      const payload = jwt.decode(token, secret)
      if (payload.userId == user.id) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.log(err)
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) console.log(err)
            User.findOneAndUpdate(
              { _id: userId },
              { password: hash },
              (err) => {
                if (err) console.log(err)
                res.status(202).json("password changed")
                receiveConfirmationEmail(userId)
              }
            )
          })
        })
      }
    })
  },

  sendRandomGratitude: async (req, res) => {
    console.log("inside send random gratitude")
    try {
      const user = await User.findById(req.params.id).populate("gratitudes")
      if (!user) console.log("no user")
      const userGratitudes = user.gratitudes

      if (userGratitudes.length < 2) {
        console.log("Sorry you can't opt for this thing yet")
      } else if (userGratitudes.length > 2) {
        let gratitudesArray = userGratitudes.map((item) => {
          return {
            date: item.createdAt,
            gratitudeTitle: item.gratitudeTitle,
            gratitudeDescription: item.gratitudeDescription,
          }
        })
        const randomGratitudeObject =
          gratitudesArray[Math.floor(Math.random() * gratitudesArray.length)]
        const emailTemplate = randomGratitudeTemplate(
          user,
          randomGratitudeObject
        )
        // cron.schedule("30 9 * * *", () => { //send email 9:30 in the morning everyday
        transporter.sendMail(emailTemplate, (err, info) => {
          if (err) {
            res.json({ Error: err })
          }
          res.json({ info: info.response })
        })
        // })
      }
    } catch (error) {
      console.log(error)
    }
  },
}
