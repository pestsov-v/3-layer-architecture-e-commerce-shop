const Course = require("../models/course.model");
const { validationResult } = require("express-validator");
const {
  getCoursesByDb,
  getOneCourseByDb,
  editOneCourseByDb,
  deleteOneCourseByDb,
} = require("../repositories/courses.repositories");

const getCourses = async (req, res) => {
  try {
    const courses = await getCoursesByDb();

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
    const course = await getOneCourseByDb(req.params);
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
    const course = await getOneCourseByDb(req.params);

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

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/courses/${id}/edit?allow=true`);
  }

  try {
    const course = await editOneCourseByDb(req.body);

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
    await deleteOneCourseByDb(req.body, req.user);
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
