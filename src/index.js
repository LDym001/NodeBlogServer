const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const Jwt = require('jsonwebtoken')
const {FindData,FindTagData,FindCategoryData,editFile,addBlogData} = require('../utls/index.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//跨域响应头设置
app.all('*',function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
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
  let {username,password} = req.body
  if(username=='idom'&&password=='111'){
    let token = creatToken(username)
    res.json({
      token,
      msg: '登陆成功！'
    })
  } else {
    res.sendStatus(401)
  }
})

app.post('/gettag',function(req,res) {
  FindTagData(res)
})

app.post('/getcategory',function(req,res) {
  FindCategoryData(res)
})

app.post('/getdesc',function(req,res) {
  let {tag,category} = req.body.data
  FindData(tag,category,res)
})

app.post('/getdata',function(req,res) {
  const path = req.body.path  
  fs.readFile(path,(err,data) => {
    if(err) {
      res.sendStatus(500)
      return 
    }
    res.send(JSON.stringify(data.toString()))
  })
})

app.post('/editdata',function(req,res) {
  const {filePath,fileContent} = req.body
  editFile(filePath,fileContent,res)
})

app.post('/addblog',function(req,res) {
  const {tag,category,title,content} = req.body
  addBlogData(tag,category,title,content,res)
})

app.listen(3000,(req,res) => {
  console.log('服务器启动成功')
})

