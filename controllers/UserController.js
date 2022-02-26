const Joi = require("joi"); 
const { generateAccessToken, auth, logout } = require("../middleware/auth");
const User = require("../model/User");
 
const validator=async (data)=>{
   try {
      const schema = Joi.object({
         username: Joi.string().min(5).max(20).required(),
         email: Joi.string().email().required(),
         password: Joi.string().min(5).max(15).required(),
         repeat_password:Joi.ref('password')
     });
     const {repeat_password,...newData} = await schema.validateAsync(data,{abortEarly: false}); 
     return newData;
     
   } catch (error) {  
      const errors=[]; 
      if (error.isJoi) {
         for (let item of error.details) {
            errors.push({field:item.path[0],err:item.message}) 
         } 
        res.status(422).send({errors})
      }      
      
   }
} 

exports.signup=async(req,res)=>{  
   const newData =await validator(req.body)
   await User.create(newData).then((result) => {
      const token = generateAccessToken(req.body)
      res.json({result,token,status:true});      
    }).catch((err) => {  
     const errors=[];  
      if (err.code===11000){ 
         errors.push({field:'email',err:'email already exist'})  
         res.status(422).json({errors}); 
      }      
    }); 
  
}

exports.signin=(req,res)=>{
     
   res.send("Tested");
}
exports.signout=(req,res)=>{ 
    logout(req) 
}
exports.me=async(req,res)=>{ 
   console.log(await auth(req))
   // res.json(await auth(req) );
} 
