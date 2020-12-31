
const express=require("express")
const router=express.Router()
const mongoose=require('mongoose')
const Employee=mongoose.model('Employee');

router.get("/",(req,res)=>{
    res.render('main',{
        title:"signin form",
    });
    
})
router.post('/',(req,res)=>{
    if(req.body._id=='')
    {
        
        
        
            const newEmployee=new Employee({
                fullname:req.body.fullname,
                email:req.body.email,
                mobile:req.body.mobile,
                city:req.body.city,
            })
            newEmployee.save((err,doc)=>{
                if(!err)
                res.redirect("employee/list")
                else
                {
                    if(err.name=="ValidationError")
                    {
                        handleValidationError(err,req.body);
                        res.render('main',{
                            title:"signin form",
                            employee:req.body,
                        });
                        
                        
                    }
                    else{
                        res.status(400).send("error due to save");
                    }
                }
            });
    
        

    }
    else{
        updateRecord(req,res);
    }
    
})
function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){res.redirect("employee/list")}
        else{
            if(err.name=="ValidationError")
            {
                handleValidationError(err,req.body);
                res.render('main',{
                    title:"Update Employee",
                    employee:req.body,
                });

            }
            else{
                res.status(400).send("error due to save");

            }

        }
    })
}
function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullname':
                body['fullnameError']=err.errors[field].message;
                break;
            case 'email':
                body['emailError']=err.errors[field].message;
                break;
            default:
                break;
            
        }
    }
}

router.get("/list",(req,res)=>{
    //res.render("list");
    Employee.find((err,docs)=>{
        if(!err){
            res.render('list',{
                list:docs,

            })
        }
        else{
            res.status(400).send("error");
        }
        
    })
    
})
router.get("/:id",(req,res)=>{
    Employee.findById(req.params.id,(err,doc) =>{
        if(!err){
            res.render('main',{
                title:"Update employee",
                employee:doc,
            })
        }
        else
        {
            console.log(err);
        }
    })
    
})
router.get("/delete/:id",(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc) =>{
        if(!err){
            res.redirect('/employee/list')
        }
        else
        {
            console.log(err);
        }
    })
    
})

module.exports=router;