const Course = require("../models/course.model");
const { mapCartItems, computePrice } = require("../helpers/cart.helpers");

const getCard = async (req, res) => {
  const user = await req.user.populate("cart.items.courseId").execPopulate();

  const courses = mapCartItems(user.cart);

  res.render("card", {
    title: "Корзина",
    isCard: true,
    courses: courses,
    price: computePrice(courses),
  });
};

const postCard = async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  res.redirect("/card");
};

const deleteCard = async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.courseId").execPopulate();
  const courses = mapCartItems(user.cart);
  const cart = {
    courses,
    price: computePrice(courses),
  };
  res.status(200).json(cart);
};

module.exports = {
  postCard,
  getCard,
  deleteCard,
};
