const bcrypt = require('bcryptjs');
const Joi = require('joi');
const mongoose = require('mongoose'); 

const Schema = new mongoose.Schema({ 
  username: String,
  email: {
      type:String,
      unique:true
  },
  password:  String ,
  token:{
    type: String
 }
},
{
  timestamps:true
}
);



 
Schema.pre('save',  function(next) {
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  this.password=hash; 
  next();
})

module.exports=mongoose.model("User",Schema);