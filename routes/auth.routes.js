const express = require("express");
const authRouter = express.Router();
const { registerValidators } = require("../utils/validators");

const {
  getLogin,
  getLogout,
  postLogin,
  postRegister,
  getReset,
  postReset,
  getPasswordToken,
  postPassword,
} = require("../services/auth.service");

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.get("/logout", getLogout);

authRouter.post("/register", registerValidators, postRegister);

authRouter.get("/reset", getReset);

authRouter.get("/password/:token", getPasswordToken);
authRouter.post("/password", postPassword);

authRouter.post("/reset", postReset);

module.exports = authRouter;
