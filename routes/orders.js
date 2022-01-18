const express = require("express");
const ordersRouter = express.Router();
const auth = require("../midlleware/auth");

const { getOrders, postOrders } = require("../controllers/orders.controllers");

ordersRouter.get("/", auth, getOrders);
ordersRouter.post("/", auth, postOrders);

module.exports = ordersRouter;
