const Course = require("../models/course.model");

async function getCoursesByDb() {
  return await Course.find()
    .populate("userId", "email name")
    .select("price title img");
}

async function getOneCourseByDb(params) {
  return await Course.findById(params.id);
}

async function editOneCourseByDb(body) {
  return await Course.findById(body.id);
}

async function deleteOneCourseByDb(body, user) {
  return await Course.deleteOne({
    _id: body.id,
    userId: user._id,
  });
}

module.exports = {
  getCoursesByDb,
  getOneCourseByDb,
  editOneCourseByDb,
  deleteOneCourseByDb,
};
