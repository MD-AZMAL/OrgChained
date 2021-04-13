const routeNames = require("../utils/routeNames");

const checkClientParams = (req, res, next) => {
  const missing = [];
  let responseObject;

  switch (req.route.path) {
    case routeNames.signup:
      if (!req.body.firstName) missing.push("firstName");
      if (!req.body.lastName) missing.push("lastName");
      if (!req.body.email) missing.push("email");
      if (!req.body.idNo) missing.push("idNo");
      if (!req.body.password) missing.push("password");
      break;
    default:
      break;
  }

  if (missing.length === 0) {
    return next();
  }

  responseObject = {
    success: false,
    route: req.route.path,
    info: null,
    error: "missing client parameters",
    content: { message: missing, name: "Error" },
  };

  res.status(400).send(responseObject);
};

module.exports = checkClientParams;
