const {
  findUserById,
  createAvatarUrl,
  changeUserName,
} = require("../services/profile.service");

const getProfile = async (req, res) => {
  res.render("profile", {
    title: "Профиль",
    isProfile: true,
    user: req.user,
  });
};

const postProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user);
    const toChange = changeUserName(req.body, req.file);
    Object.assign(user, toChange);
    await user.save();
    res.redirect("/profile");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getProfile,
  postProfile,
};
