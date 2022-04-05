const fs = require('fs')
const { model, Schema } = require('../database/connect')
const CategorySchema = require('../database/model/category.js')
const NoteTypeSchema = require('../database/model/notetype.js')
const DescriptionSchema = require('../database/model/blogdesc.js')

const notetypeModel = model('notetype',NoteTypeSchema)
const categoryModel = model('category',CategorySchema)
const blogdescModel = model('blogdesc',DescriptionSchema)

const FindData = (arg1,arg2,callback) => {
  let condition = {}
  if(arg1&&!arg2) {
    condition = {'tag': arg1}
  }
  if(arg1&&arg2) {
    condition = {'tag': arg1,'category':arg2}
  }
  blogdescModel.find(
    condition,
    null,
    {limit: 7},
    function(err,docs) {
      if(err) {
       callback.statusCode(500)
      }
      let result = []
      docs.forEach(item => {
        result.push({
          'path':item.path,
          'category': item.category,
          'title': item.title,
          'time': item.meta.createAt
        })
      })
      callback.send(JSON.stringify(result))
    }
  )
}

let result

const FindTagData = function(callback) {
  result = []
  notetypeModel.find({},function(err,docs) {
    if(err) {
      callback.statusCode(500)
    }
    for(let i = 0; i<docs.length; i++) {
      result.push(docs[i].tag)
    }
    callback.send(JSON.stringify(result))
  })
}

const FindCategoryData = (callback) => {
  // console.log('---findcategorydata',result,'-----findcategorydata-----')
  categoryModel.find({},function(err,docs) {
    if(err) {
      callback.statusCode(500)
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
    callback.send(JSON.stringify(category))
  })
}

const editFile = (filePath,fileContent,callback) => {
  fs.writeFile(filePath,fileContent,{flag:'w+'},(err,data) => {
    if(err) {
      if(callback) {
        callback.sendStatus(500)
        callback.send({status:'fail'})
      }
      return 
    }
    if (callback) {
      callback.send({status:'success'})
    }
  })
}

const addBlogData = (tag,category,title,content,callback) => {
  const path = `./static/${title}.md`
  let bd = new blogdescModel({
    tag,
    category,
    title,
    path
  })
  bd.save((err,docs) => {
    if (err) {
      callback.sendStatus(500)
      callback.send({status: 'fail'})
      return
    }
    editFile(path,content,callback)
  })
}



module.exports = {
  FindData,
  FindTagData,
  FindCategoryData,
  editFile,
  addBlogData
}