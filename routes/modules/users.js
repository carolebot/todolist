const express = require('express')
const router = express.Router()
const User = require('../../models/user')

const passport = require('passport')
const bcrypt = require('bcryptjs')
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

// 取得註冊表單參數
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  // 必填欄位沒填 注意message物件格式跟success_msg不同
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '有欄位尚未填寫' })
  }
  // 密碼確認有誤
  if (password !== confirmPassword) {
    errors.push({ message: '密碼確認有誤' })
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      errors.push({ message: '這個email已被註冊' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 如果還沒註冊：加密後寫入資料庫
    return bcrypt
      .genSalt(10)
      //hash密碼 加上salt
      .then(salt => { 
        return bcrypt.hash(password, salt)
      })
      // 用了hash會拿到hash的密碼
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router