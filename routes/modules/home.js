const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
router.get('/', (req, res) => {
  const userId = req.user._id
  console.log(userId)
  // 拿到全部的todo資料(userId:userId)
  Todo.find({ userId })
    .lean() //mongoose轉JS可處理格式
    .sort({ name: 'asc' }) //desc
    .then(todos => res.render('index', { todos })) //陣列傳到index
    .catch(err => console.error(err))
})

module.exports = router