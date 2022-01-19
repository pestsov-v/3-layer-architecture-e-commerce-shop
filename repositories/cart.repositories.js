const Course = require("../models/course.model");
const { mapCartItems } = require("../helpers/cart.helpers");

async function getCart(user) {
  const customer = await user.populate("cart.items.courseId").execPopulate();
  return (courses = mapCartItems(customer.cart));
}

async function postCart(body, user) {
  const course = await Course.findById(body.id);
  await user.addToCart(course);
}

module.exports = {
  getCart,
  postCart,
};
