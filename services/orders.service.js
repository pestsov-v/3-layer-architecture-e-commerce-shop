const {
  getOrderList,
  createUserCoursesCart,
} = require("../helpers/orders.helpers");
const {
  findOrder,
  getUserItems,
  createNewOrder,
} = require("../repositories/orders.repositories");

const getOrders = async (req, res) => {
  try {
    const orders = await findOrder(req.user);

    res.render("orders", {
      isOrder: true,
      title: "Заказы",
      orders: getOrderList(orders),
    });
  } catch (e) {
    console.log(e);
  }
};

const postOrders = async (req, res) => {
  try {
    const user = await getUserItems(req.user);
    const courses = createUserCoursesCart(user);
    const order = createNewOrder(user, courses);
    await order.save();
    await req.user.clearCart();

    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getOrders,
  postOrders,
};
