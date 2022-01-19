const User = require("../models/user.model");

async function findUserById(user) {
  return await User.findById(user._id);
}

function changeUserName(body, file) {
  toChange = {
    name: body.name,
  };

  if (file) {
    toChange.avatarUrl = file.path;
  }

  return toChange;
}

module.exports = {
  findUserById,
  changeUserName,
};
