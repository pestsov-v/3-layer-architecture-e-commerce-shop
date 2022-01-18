const express = require("express");
const addRouter = express.Router();
const { courseValidators } = require("../utils/validators");
const auth = require("../middleware/auth.middleware");

const { getAdd, postAdd } = require("../controllers/add.controllers");

addRouter.get("/", auth, getAdd);
addRouter.post("/", auth, courseValidators, postAdd);

module.exports = addRouter;
