const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  console.log(req.body)
  const { email, password } = req.body
  res.render('./')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
  const { name, email, password, confirmPassword } = req.body
  res.render('./')
})

module.exports = router