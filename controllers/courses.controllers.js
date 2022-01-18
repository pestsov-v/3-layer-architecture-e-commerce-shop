const Course = require("../models/course.model");
const { validationResult } = require("express-validator");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("userId", "email name")
      .select("price title img");

    res.render("courses", {
      title: "Курсы",
      isCourses: true,
      userId: req.user ? req.user._id.toString() : null,
      courses,
    });
  } catch (e) {
    console.log(e);
  }
};

const getOneCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render("course", {
      layout: "empty",
      title: `Курс ${course.title}`,
      course,
    });
  } catch (e) {
    console.log(e);
  }
};

const getEditOneCourse = async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try {
    const course = await Course.findById(req.params.id);

    if (course.userId.toString() !== req.user._id.toString()) {
      return res.redirect("/courses");
    }

    res.render("course-edit", {
      title: `Редактировать ${course.title}`,
      course,
    });
  } catch (e) {
    console.log(e);
  }
};

const postEditOneCourse = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`);
  }

  try {
    delete req.body.id;
    const course = await Course.findById(id);
    if (course.userId.toString() !== req.user._id.toString()) {
      res.redirect("/courses");
    }
    Object.assign(course, req.body);
    await course.save();
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
};

const postRemoveOneCourse = async (req, res) => {
  try {
    const course = await Course.deleteOne({
      _id: req.body.id,
      userId: req.user._id,
    });
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getCourses,
  getOneCourse,
  getEditOneCourse,
  postEditOneCourse,
  postRemoveOneCourse,
};
