const express = require("express");
const homeRouter = express.Router();
const { getHome } = require("../controllers/home.controllers");

homeRouter.get("/", getHome);

module.exports = homeRouter;
