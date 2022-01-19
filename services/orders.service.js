const Order = require("../models/order.model");

function findOrder(user) {
  return Order.find({ "user.userId": user._id }).populate("user.userId");
}

async function getUserItems(user) {
  return await user.populate("cart.items.courseId").execPopulate();
}

function createNewOrder(user, courses) {
  return new Order({
    user: {
      name: user.name,
      userId: user,
    },
    courses,
  });
}

module.exports = {
  findOrder,
  getUserItems,
  createNewOrder,
};
