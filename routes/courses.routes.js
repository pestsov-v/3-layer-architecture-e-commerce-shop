const express = require("express");
const courseRouter = express.Router();
const auth = require("../middleware/auth.middleware");

const { courseValidators } = require("../utils/validators");

const {
  getCourses,
  getOneCourse,
  getEditOneCourse,
  postEditOneCourse,
  postRemoveOneCourse,
} = require("../services/courses.service");

courseRouter.get("/", getCourses);
courseRouter.get("/:id", getOneCourse);

courseRouter.get("/:id/edit", auth, getEditOneCourse);
courseRouter.post("/edit", auth, courseValidators, postEditOneCourse);

courseRouter.post("/remove", auth, postRemoveOneCourse);

module.exports = courseRouter;
