require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();

const routes = [require("./router/user"),require('./router/area')];

// const User = require("./models/User");

const port = process.env.PORT || 8080;

const dbPort = 27018;
const dbName = "OrgChained";

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const sessionStore = new MongoDBStore({
//   uri: `mongodb://localhost:${dbPort}/${dbName}`,
//   collection: "sessions",
// });

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "abcxyz",
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//       maxAge: 60 * 60 * 1000,
//     },
//     store: sessionStore,
//   })
// );

routes.map((router) => app.use(router));

// app.post("/", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   console.log(`Email is ${email}`);

//   let status = 0;
//   let data = {};

//   try {
//     data = await User.create({ email: email, password: password });
//     status = 200;
//   } catch (err) {
//       status = 400;
//       data = err;
//   }
//   res.status(status).send(data);
// });

// app.get("/", async (req, res) => {
//   const users = await User.find({});
//   res.status(200).send(users);
// });

app.post('/test', authenticateToken, (req,res) => res.send(req.user))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
