const { validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAdd = (req, res) => {
  res.render("add", {
    title: "Добавить курс",
    isAdd: true,
  });
};

const postAdd = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Добавить курс",
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
      },
    });
  }

  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    userId: req.user,
  });

  try {
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
