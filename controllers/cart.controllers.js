const { computePrice } = require("../helpers/cart.helpers");
const { getCart, postCart } = require("../services/cart.service");

const getCard = async (req, res) => {
  const courses = await getCart(req.user);

  res.render("card", {
    title: "Корзина",
    isCard: true,
    courses: courses,
    price: computePrice(courses),
  });
};

const postCard = async (req, res) => {
  await postCart(req.body, req.user);
  res.redirect("/card");
};

const deleteCard = async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const courses = await getCart(req.user);
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
