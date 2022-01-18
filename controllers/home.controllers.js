const getHome = (req, res) => {
  res.render("index", {
    title: "Главная страница",
    isHome: true,
  });
};

module.exports = {
  getHome,
};
