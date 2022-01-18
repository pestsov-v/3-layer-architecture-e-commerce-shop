const bcrypt = require("bcryptjs");
const regEmail = require("../emails/registration");
const { validationResult } = require("express-validator");
const transporter = require("../services/email.service");
const crypto = require("crypto");
const resetEmail = require("../emails/reset");
const {
  findUserEmailService,
  comparePasswordService,
  getToken,
  findUserTokenInParams,
  createNewUser,
} = require("../services/auth.service");

const getLogin = async (req, res) => {
  res.render("auth/login", {
    title: "Авторизация",
    isLogin: true,
    loginError: req.flash("loginError"),
    registerError: req.flash("registerError"),
  });
};

const postLogin = async (req, res) => {
  try {
    const candidate = await findUserEmailService(req.body);

    if (candidate) {
      const areSame = await comparePasswordService(
        req.body.password,
        candidate
      );

      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw err;
          }
          res.redirect("/");
        });
      } else {
        req.flash("loginError", "Неверный пароль");
        res.redirect("/auth/login#login");
      }
    } else {
      req.flash("loginError", "Такого пользователя не существует");
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
};

const getLogout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
};

const postRegister = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("registerError", errors.array()[0].msg);
      return res.status(422).redirect("/auth/login#register");
    }

    const user = await createNewUser(req.body);
    await user.save();

    try {
      await regEmail(req.body);
      res.redirect("/auth/login#login");
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

const getReset = (req, res) => {
  res.render("auth/reset", {
    title: "Забыли пароль?",
    error: req.flash("error"),
  });
};

const postReset = (req, res) => {
  try {
    callback = async (err, buffer) => {
      if (err) {
        req.flash("error", "Что-то пошло не так, повторите попытку позже");
        return res.redirect("/auth/reset");
      }

      const token = getToken(buffer);
      const candidate = await findUserEmailService(req.body);

      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        await transporter.sendMail(resetEmail(candidate.email, token));
        res.redirect("/auth/login");
      } else {
        req.flash("error", "Такого email нет");
        res.redirect("/auth/reset");
      }
    };

    crypto.randomBytes(32, callback);
  } catch (e) {
    console.log(e);
  }
};

const getPasswordToken = async (req, res) => {
  if (!req.params.token) {
    return res.redirect("/auth/login");
  }

  try {
    const user = await findUserTokenInParams(req.params);

    if (!user) {
      return res.redirect("/auth/login");
    } else {
      res.render("auth/password", {
        title: "Восстановить доступ",
        error: req.flash("error"),
        userId: user._id.toString(),
        token: req.params.token,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const postPassword = async (req, res) => {
  try {
    const user = await findUserTokenInDatabase(req.body);

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resetToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      res.redirect("/auth/login");
    } else {
      req.flash("loginError", "Время жизни токена истекло");
      res.redirect("/auth/login");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getLogin,
  getLogout,
  postLogin,
  postRegister,
  getReset,
  postReset,
  getPasswordToken,
  postPassword,
};
