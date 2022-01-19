const Course = require("../models/course.model");

async function postAddService(body, user) {
  return (course = new Course({
    title: body.title,
    price: body.price,
    img: body.img,
    userId: user,
  }));
}

function validationAddService(body) {
  return (data = {
    title: body.title,
    price: body.price,
    img: body.img,
  });
}

module.exports = { postAddService, validationAddService };
