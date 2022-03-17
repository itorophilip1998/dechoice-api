const express = require("express");
const { get_appliedFirm, create_appliedFirm, delete_appliedFirm } = require("../controllers/AppliedFirmController"); 
const { get_siwesFirm, create_siwesFirm } = require("../controllers/SiwesFirmController");
const { create_document } = require("../controllers/UploadDocumentController");
const {
  signin,
  signup,
  signout,
  me,
  token,
} = require("../controllers/UserController");
 
const { authenticateToken } = require("../middleware/auth"); 
const route = express.Router();

route // Auth Group
  .post("/signup", signup)
  .post("/signin", signin)
  .delete("/signout", authenticateToken, signout)
  .get("/me", authenticateToken, me)
  .post("/refresh-token", token)
  .get("/", (req, res) => res.send("Api"));

route // siwesfirm Routes Group
  .get("/siwesfirm", authenticateToken, get_siwesFirm)
  .get("/siwesallfirm", create_siwesFirm);
 
route // appliedFirm  Routes Group
  .get("/appliedfirm/:user_id",authenticateToken, get_appliedFirm)
  .post("/appliedfirm",authenticateToken, create_appliedFirm)
  .delete("/appliedfirm",authenticateToken, delete_appliedFirm); 

route // uploadDocument  Routes Group
  .post("/upload-document",authenticateToken, create_document) 

module.exports = route;
