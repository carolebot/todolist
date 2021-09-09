const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  //session交給passport.session 
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        // null表示過程沒有出錯 false表示驗證沒通過
        if (!user) {
          return done(null, false, { message: 'This email is not registered' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or password incorrect' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, cb) => {
      // 解構
      const { name, email } = profile._json
      user.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          // a-z 0-9 36進位的組成的8位隨機密碼 因為資料庫還是需要密碼欄位
          const randomPassword = Math.random().toString(36).slice(-8)
          // 加密 randomPassword
          bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => user.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => console.log(err))
        })
    }
  ))



  //序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}