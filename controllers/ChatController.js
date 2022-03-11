const Joi = require("joi"); 
const Chat = require("../model/Chat");
const User = require("../model/User"); 

const validator = async (data) => {
  try {
    const schema = Joi.object({
      message: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    const newData = await schema.validateAsync(data, {
      abortEarly: false,
    });
    return newData;
  } catch (error) {
    return error;
  }
};

exports.postChat = async (req, res) => {
  try {
     const validate = await validator(req.body);
    
    await Chat.create(validate)
        .then((result) => { 
          console.log(result)
        res.json({
          result, 
          msg: "Posted Chat Succesfully",
        });
      })
        .catch((err) => { 
          res.status(422).json({ err });
      });
  } catch (error) {}
};
 

exports.deletChat = async (req, res) => {
  try {
      const user_id = req.user; 
    await Chat.deleteOne({ _id: req.params.id,user_id})
      .then((result) => {
        res.json({
          result,
          msg: "Delete Chat Succesfully",
        });
      })
      .catch((err) => {
        res.status(422).json({ error });
      });
  } catch (error) {}
};
 

exports.getChat = async (req, res) => {
  try { 
    await Chat.find({})
      .then((result) => { 
        res.json({
          result, 
          msg: "Get Chat Succesfully",
        });
      })
      .catch((err) => {
          res.status(422).json({ error });
        
      });
  } catch (error) {}
};
 