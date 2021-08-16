const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
router.get('/', (req, res) => {

  // 拿到全部的todo資料
  Todo.find()
    .lean() //mongoose轉JS可處理格式
    .sort({ name: 'asc' }) //desc
    .then(todos => res.render('index', { todos })) //陣列傳到index
    .catch(err => console.error(err))
})

module.exports = router