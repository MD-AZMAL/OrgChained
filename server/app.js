const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const routes = [require("./router/user")];

// const User = require("./models/User");

const port = process.env.PORT || 8080;

const dbPort = 27018;
const dbName = "OrgChained";

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
