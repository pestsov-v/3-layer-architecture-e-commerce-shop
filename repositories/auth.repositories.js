const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function findUserEmailService(body) {
  return (candidate = await User.findOne({ email: body.email }));
}

async function comparePasswordService(password, candidate) {
  return await bcrypt.compare(password, candidate.password);
}

async function findUserTokenInParams(params) {
  return await User.findOne({
    resetToken: params.token,
    resetTokenExp: { $gt: Date.now() },
  });
}

async function findUserTokenInDatabase(body) {
  return await User.findOne({
    _id: body.userId,
    resetToken: body.token,
    resetTokenExp: { $gt: Date.now() },
  });
}

function getToken(buffer) {
  return (token = buffer.toString("hex"));
}

async function createNewUser(body) {
  const { email, password, name } = body;

  const hashPassword = await bcrypt.hash(password, 10);

  return (user = new User({
    email,
    name,
    password: hashPassword,
    cart: { items: [] },
  }));
}

module.exports = {
  findUserEmailService,
  comparePasswordService,
  getToken,
  findUserTokenInParams,
  createNewUser,
  findUserTokenInDatabase,
};
