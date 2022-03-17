const Joi = require("joi");
const Upload = require("../model/UploadDocument");
const User = require("../model/User");

const validator = async (data) => {
  try {
    const schema = Joi.object({
      department: Joi.string().required(),
      school: Joi.string().required(),
      firm_type: Joi.string().required(),
      duration: Joi.string().required(),
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

exports.create_document = async (req, res) => {
  try {
    const validate = await validator(req.body);

    await Upload.create(validate)
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
