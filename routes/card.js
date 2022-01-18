const express = require("express");
const cardRouter = express.Router();
const auth = require("../midlleware/auth");

const {
  postCard,
  getCard,
  deleteCard,
} = require("../controllers/card.controllers");

cardRouter.get("/", auth, getCard);
cardRouter.post("/add", auth, postCard);
cardRouter.delete("/remove/:id", auth, deleteCard);

module.exports = cardRouter;
