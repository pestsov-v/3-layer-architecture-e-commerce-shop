function getOrderList(orders) {
  const orderList = orders.map((o) => {
    return {
      ...o._doc,
      price: o.courses.reduce((total, c) => {
        return (total += c.count * c.course.price);
      }, 0),
    };
  });

  return orderList;
}

function createUserCoursesCart(user) {
  const userCourses = user.cart.items.map((i) => ({
    count: i.count,
    course: { ...i.courseId._doc },
  }));

  return userCourses;
}

module.exports = {
  getOrderList,
  createUserCoursesCart,
};
