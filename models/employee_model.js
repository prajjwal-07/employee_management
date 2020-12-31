const mongoose=require('mongoose')

const employeeSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:"This is required",
    },
    email:{
        type:String,
        required:"This is required.",
    },
    mobile:{
        type:String,
        
    },
    city:{
        type:String,
        
    },
    



})

const Employee=new mongoose.model("Employee",employeeSchema);