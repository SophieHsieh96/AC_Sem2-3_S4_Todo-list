//載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const exphbs = require('express-handlebars')
const app = express()
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes') //引用路由器


// 僅在非正式環境時，使用 dotenv
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //設定連線到 mongoDB

//取得資料庫連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes) //將request 導入路由器

//設定首頁路由
//app.get('/', (req, res) => {
  //  Todo.find() //取出 Todo model 所有資料
    //    .lean() //把Mongoose 的 Model物件轉成乾淨的JavaScript資料陣列
      //  .sort({ _id: 'asc'}) //根據_id升冪排序
        //.then(todos => res.render('index', {todos})) //將資料傳給Index樣板
        //.catch(error => console.log(error)) //錯誤處理
//})

//app.get('/todos/new', (req, res) => {
  //  return res.render('new')
//})


//app.post('/todos', (req, res) =>{
  //  const name = req.body.name           //get name record from req.body
   // return Todo.create({ name })         // save to dataBase
     //   .then(() => res.redirect('/'))    // finish creation then back home page
      //  .catch(error => console.log(error))
//})

//app.get('/todos/:id', (req, res) => {
  //  const id = req.params.id
   // return Todo.findById(id)
     //   .lean()
       // .then((todo) => res.render('detail', { todo }))
        //.catch(error => console.log(error)) 
//})

//app.get('/todos/:id/edit', (req, res) => {
  //  const id = req.params.id
   // return Todo.findById(id)
     //   .lean()
       // .then((todo) => res.render('edit', { todo }))
        //.catch(error => console.log(error)) 
//})

//app.put('/todos/:id', (req, res) => {
  //  const id = req.params.id
    //const {name, isDone} = req.body
    //return Todo.findById(id)
      //  .then(todo => {
        //    todo.name = name
          //  todo.isDone = isDone === 'on'
           // return todo.save()
        //})
       // .then(()=> res.redirect(`/todos/${id}`))
        //.catch(error => console.log(error)) 
//})

//app.delete('/todos/:id', (req, res) => {
  //  const id = req.params.id
    //return Todo.findById(id)
      //  .then(todo => todo.remove())
        //.then(() => res.redirect('/'))
        //.catch(error => console.log(error))
//})



//設定port 3000
app.listen(3000, () =>{
    console.log('App is running on http://localhost:3000')
})

