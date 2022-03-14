const Joi = require("joi");
const Chat = require("../model/Chat");
const User = require("../model/User");

const validator = async (data) => {
  try {
    const schema = Joi.object({
      message: Joi.string().required().trim(),
      user_id: Joi.string().required(),
      username: Joi.string().required(),
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
  const {_id, username} = await User.findOne({username:req.user})
    await Chat.create(
{
      username,
      user_id:_id,
      message:req.body.message,
}
)
      .then((result) => {
        res.json({
          result,
          msg: "Posted Chat Succesfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ err, msg: "Ops and error accured" });
      });
  } catch (err) {
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
};

exports.deletChat = async (req, res) => {
  try {
    const user_id = req.user._id; 
    
    const deleted = await Chat.findOneAndDelete({ _id: req.params.id,user_id })
    res.json({
      deleted,
      msg: "Get Deleted Succesfully"
    });
  } catch (err) {
    res.status(400).json({ err, msg: "Ops and error accured" });
  }
};

exports.getChat = async (req, res) => {
  try {
    const users = await User.find({});
    const chats = await Chat.find({});
    res.json({
      chats,
      users,
      msg: "Get Chat Succesfully",
    });
  } catch (err) {
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
};


