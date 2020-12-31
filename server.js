require('./models/db.js');
const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const employeeRoute=require('./router/employee_route')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())


//static document
const staticpath=path.join(__dirname,'/public')
app.use(express.static(staticpath))

app.set('view engine','hbs')





app.listen(3000,()=>{
    console.log("listening .....")
})

app.use('/employee',employeeRoute)


