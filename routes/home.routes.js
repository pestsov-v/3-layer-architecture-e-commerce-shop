const express = require("express");
const homeRouter = express.Router();
const { getHome } = require("../services/home.service");

homeRouter.get("/", getHome);

module.exports = homeRouter;
