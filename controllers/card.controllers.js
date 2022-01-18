const Course = require("../models/course.model");

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
  }));
}

function computePrice(courses) {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count);
  }, 0);
}

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
