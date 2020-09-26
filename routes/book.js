const express = require('express')
const fs = require('fs')
const path = require('path');
const config = require('../config.js');
// 使用 express.Router 可以创建模块化的路由
const main = express.Router()


main.get('/list', async (request, response) => {

  let { bookId, userType } = request.session;

  let ret = {
    "success": true,
    "code": 200,
    "message": "",
    "data": [],
  }

  const booksDir = path.resolve(__dirname, '..', 'build/books');
  var readDir = fs.readdirSync(booksDir);

  let books = userType == 1 ? readDir : config.userTypeMap[userType];

  console.log('bookId', bookId);
  console.log('userType', userType);

  const datas = readDir.filter(e => books.includes(e)).map((e, index) => ({
    url: userType == 1 || index <= bookId ? `/books/${e}/index.html` : '',
    cover: userType == 1 || index <= bookId ? `/books/${e}/cover.jpeg` : 'lock.jpeg',
    title: e,
    id: index
  }))

  ret.data = datas
  response.send(ret)
})


module.exports = main
