const express = require("express");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const homeRoutes = require("./routes/home.routes");
const cardRoutes = require("./routes/card.routes");
const addRoutes = require("./routes/add.routes");
const ordersRoutes = require("./routes/orders.routes");
const coursesRoutes = require("./routes/courses.routes");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const errorMiddleware = require("./middleware/error.middleware");
const varMiddleware = require("./middleware/variables.midleware");
const fileMiddleware = require("./middleware/file.middleware");
const UserMiddleware = require("./middleware/user.midleware");
const keys = require("./keys");

const app = express();
const store = new MongoStore({
  collection: "sessions",
  uri: keys.MONGODB_URL,
});

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./helpers/hbs.helpers"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(fileMiddleware.single("avatar"));
app.use(csrf());
app.use(flash());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "https:"],
        "script-src-elem": [
          "'self'",
          "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
          "'unsafe-inline'",
        ],
      },
    },
  })
);
app.use(compression());
app.use(varMiddleware);
app.use(UserMiddleware);

app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/courses", coursesRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
