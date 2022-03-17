const Joi = require("joi");
const AppliedFirm = require("../model/AppliedFirm"); 

const validator = async (data) => {
  try {
    const schema = Joi.object({
      siwes_firm_id: Joi.string().required(),
      user_id: Joi.string().required(),
    });
    const newData = await schema.validateAsync(data, {
      abortEarly: false,
    });
    return newData;
  } catch (err) {
    console.log(err);

    return err;
  }
};

exports.get_appliedFirm = async (req, res) => {
  try {
    const { user_id } = req.body; 
    await AppliedFirm.find({user_id})
      .then((result) => {
        res.json({
          result,
          msg: "Get Succesfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ err, msg: "Ops and error accured" });
      });
  } catch (err) {
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
};
exports.create_appliedFirm = async (req, res) => {
  try {
    // const validate = await validator(req.body);
    await AppliedFirm.create(req.body)
      .then((result) => {
        res.json({
          result,
          msg: "Created Succesfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ err, msg: "Ops and error accured" });
      });
  } catch (err) {
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
};
exports.delete_appliedFirm = async (req, res) => {
  try {
      const { user_id, siwes_firm_id } = req.body;
    await AppliedFirm.deleteOne({ user_id, siwes_firm_id })
      .then((result) => {
        res.json({
          result,
          msg: "Deleted Succesfully",
        });
      })
      .catch((err) => {
        res.status(400).json({ err, msg: "Ops and error accured" });
      });
  } catch (err) {
    res.status(402).json({ err, msg: "Ops and error accured" });
  }
};
