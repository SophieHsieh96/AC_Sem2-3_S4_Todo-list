//載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes') //引用路由器

require('./config/mongoose')

const app = express()



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes) //將request 導入路由器


//設定port 3000
app.listen(3000, () =>{
    console.log('App is running on http://localhost:3000')
})

