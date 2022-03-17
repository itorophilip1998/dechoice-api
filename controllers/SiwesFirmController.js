const Joi = require("joi");
const SiwesFirm = require("../model/SiwesFirm");
const User = require("../model/User");

// const data = [
//   {
//     url: "https://i2.wp.com/media.premiumtimesng.com/wp-content/files/2012/11/ibom-e-library.jpg?fit=500%2C346&ssl=1",
//     name: "Ibom Elibrary",
//     location: "ALONG IBB WAY, Uyo, Nigeria",
//     price: 15000,
//   },
//   {
//     url: "https://starthub.com.ng/wp-content/uploads/elementor/thumbs/starthub-women-cross-section-scaled-p5brqyanfjzudtwtt31ethgiy3zuagfpi1eeyz59m0.jpg",
//     name: "StartHub",
//     location: "264 Oron road, Uyo,Nigeria",
//     price: 0,
//   },
//   {
//     url: "https://theroothub.com/wp-content/uploads/2020/07/roothub-full-BLUE.png",
//     name: "RootHub",
//     location: "Akees Plaza, Opp Ibom Hall,IBB Avenue, Uyo.",
//     price: 0,
//   },
  
//   {
//     url: "https://theroothub.com/wp-content/uploads/2020/07/roothub-full-BLUE.png",
//     name: "RootHub",
//     location: "Akees Plaza, Opp Ibom Hall,IBB Avenue, Uyo.",
//     price: 0,
//   }
// ];

exports.create_siwesFirm= async (req, res) => {
  try { 
     await SiwesFirm.create(data)
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

exports.get_siwesFirm= async (req, res) => {
  try { 
     await SiwesFirm.find({})
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
