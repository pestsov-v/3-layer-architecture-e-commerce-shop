const { validationResult } = require("express-validator");
const {
  postAddService,
  validationAddService,
} = require("../services/add.service");

const getAdd = (req, res) => {
  res.render("add", {
    title: "Добавить курс",
    isAdd: true,
  });
};

const postAdd = async (req, res) => {
  const errors = validationResult(req);
  const data = validationAddService(req.body);

  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Добавить курс",
      isAdd: true,
      error: errors.array()[0].msg,
      data,
    });
  }

  try {
    const course = await postAddService(req.body, req.user);
    await course.save();
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAdd,
  postAdd,
};
