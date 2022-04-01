const fs = require('fs')
const { default: mongoose } = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const Jwt = require('jsonwebtoken')
const { model, Schema } = require('../database/connect')
const BlogDataSchema = require('../database/model/blogdata')
const CategorySchema = require('../database/model/category.js')
const NoteTypeSchema = require('../database/model/notetype.js')
const DescriptionSchema = require('../database/model/blogdesc.js')

const notetypeModel = model('notetype',NoteTypeSchema)
const categoryModel = model('category',CategorySchema)
const blogdataModel = model('blogdata',BlogDataSchema)
const blogdescModel = model('blogdesc',DescriptionSchema)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('*',function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// 创建token
function creatToken(username) {
  // 传入用户id用来生成token
  let token = Jwt.sign(
    //payload:签发的token里面包括Header（头部）、Payload（负载）、Signature（签名）
    {username},
    //私钥
    'idomstudyjwt',
    //设置的token过期时间
    {expiresIn:60*60}
  )
  return token
}

app.post('/login',(req,res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  let username = req.body.username
  let password = req.body.password
  if(username=='idom'&&password=='myblog666'){
    let token = creatToken(username)
    res.json({
      token,
      msg: '登陆成功！'
    })
  }
})

let result
app.post('/gettag',function(req,res) {
  notetypeModel.find({},function(err,docs) {
    if(err) {
      res.statusCode(500)
      return
    }
    result = []
    for(let i = 0; i<docs.length; i++) {
      result.push(docs[i].tag)
    }
    res.send(JSON.stringify(result))
  })
})

app.post('/getcategory',function(req,res) {
  categoryModel.find({},function(err,docs) {
    if(err) {
      console.log(err,'响应失败')
      res.statusCode(500)
      return
    }
    //将所有categories中的数据归类返回
    let category = {}
    result.forEach(tag => {
      //tag数据全部存放在它们对应的数组中
      category[tag] = []
      docs.forEach(cat => {
        if(cat.tag == tag) {
          category[tag].push(cat)
        }
      })
    })
    res.send(JSON.stringify(category))
  })
})

app.post('/getdesc',function(req,res) {
  let msg = req.body
  if(!msg.data.tag&&!msg.data.category) {
    blogdescModel.find(
      {},
      null,
      {limit: 7},
      function(err,docs) {
        if(err) {
          res.statusCode(500)
          return
        }
        result = []
        docs.forEach(item => {
          result.push({
            'description':item.description,
            'category': item.category,
            'title': item.title,
            'time': item.meta.createAt
          })
        })
        res.send(JSON.stringify(result))
      }
    )
  } else {
    blogdescModel.find(
      {'tag':msg.data.tag,'category': msg.data.category},
      null,
      {limit: 5},
      function(err,docs) {
        if(err) {
          res.statusCode(500)
          return
        }
        result = []
        docs.forEach(item => {
          result.push({
            'description':item.description,
            'category': item.category,
            'title': item.title,
            'time': item.meta.createAt
          })
        })
        res.send(JSON.stringify(result))
      }
    )
  }
  
})

app.post('/getdata',function(req,res) {
  fs.readFile('./static/vue生命周期详解.md',(err,data) => {
    if(err) {
      console.log(err,'-------')
      res.sendStatus(500)
      return 
    }
    res.send(JSON.stringify(data.toString()))
  })
})

app.listen(3000,(req,res) => {
  console.log('服务器启动成功')
})

