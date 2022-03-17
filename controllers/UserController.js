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
 
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const newData = await schema.validateAsync(data, {
      abortEarly: false,
    });
    return newData;
};

exports.signup = async (req, res) => {
  try {
    await validator(req.body);
    const getUser = await User.findOne({ email: req.body.email });
    if (getUser) return res.json({ msg: "user Already exist" });
    await User.create(req.body)
      .then((result) => {
        const { username, password } = result;
        // generate tokens
        const access_token = generateAccessToken(email, password);
        const refresh_token = generateRefreshToken(email, password);
        res.json({
          result,
          access_token,
          msg: "Registered Succesfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ err, msg: "Ops and error accured" });
      });
  } catch (err) {  
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
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
    const access_token = generateAccessToken(user.email, user.password);
    const refresh_token = generateRefreshToken(user.email, user.password);
    res.json({
      user,
      access_token,
      msg: "Login Succesfully",
    });
  } catch (err) { 
  res.status(402).json({ err, msg: "Ops and error accured" });
  }
};

exports.signout = (req, res) => {
  try {
    logout();
    res.json({
      msg: "Logout Succesfully",
    });
  } catch (err) { 
        res.status(402).json({ err, msg: "Ops and error accured" });

  }
};

exports.me = async (req, res) => {
  try {
    res.send(await req.user);
  } catch (err) {
     res.status(402).json({ err, msg: "Ops and error accured" });

  }
};

exports.token = (req, res) => {
  try {
    refreshToken(req.body.token);
    res.json({
      msg: "Token Refreshed Succesfully",
    });
  } catch (err) {
     res.status(402).send({ err, msg: "Ops and error accured" });

  }
};
