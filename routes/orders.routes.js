const express = require("express");
const ordersRouter = express.Router();
const auth = require("../middleware/auth.middleware");

const { getOrders, postOrders } = require("../services/orders.service");

ordersRouter.get("/", auth, getOrders);
ordersRouter.post("/", auth, postOrders);

module.exports = ordersRouter;
