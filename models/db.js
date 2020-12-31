const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/employeeDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true
//   useFindAndModify: false,
//   useCreateIndex: true,
}).then(() => console.log("connection done")).catch((err)=>console.log(err));

require('./employee_model')
