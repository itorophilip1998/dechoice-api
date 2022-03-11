const { compareSync } = require("bcryptjs");
const Joi = require("joi");
const {
  generateAccessToken,
  generateRefreshToken,
  logout,
  refreshToken,
} = require("../middleware/auth");
const User = require("../model/User");

const validator = async (data) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(5).max(8).required(), 
      password: Joi.string().min(5).max(8).required()
    });
    const newData  = await schema.validateAsync(data, {
      abortEarly: false,
    });
    return newData;
  } catch (error) {
    return error;
  }
};

exports.signup = async (req, res) => {
  try {
    await validator(req.body);
    await User.create(req.body)
      .then((result) => {
        const { username, password } = result;
        // generate tokens
        const access_token = generateAccessToken(username, password);
        const refresh_token = generateRefreshToken(username, password);
        
           console.log(result);
        res.json({
          result,
          access_token,
          msg: "Registered Succesfully",
        });
      })
      .catch((err) => {
         res.send(err)
      });
  } catch (error) {}
};

exports.signin = async (req, res) => {
  try {
    //   get user , verify email and password
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ msg: `this user is not registered` });
    const correctPassword = await compareSync(password, user.password);
    if (!correctPassword)
      return res.status(401).json({ msg: `invalid password` });

    // generate tokens
    const access_token = generateAccessToken(user.username, user.password);
    const refresh_token = generateRefreshToken(user.username, user.password);
    res.json({
      user,
      access_token,
      msg: "Login Succesfully",
    });
  } catch (error) {}
};

exports.signout = (req, res) => {
  try {
    logout();
    res.json({
      msg: "Logout Succesfully",
    });
  } catch (error) {}
};

exports.me = async (req, res) => {
  try {
    res.send(await req.user);
  } catch (error) {}
};

exports.token = (req, res) => {
  try {
    refreshToken(req.body.token);
    res.json({
      msg: "Token Refreshed Succesfully",
    });
  } catch (error) {}
};
