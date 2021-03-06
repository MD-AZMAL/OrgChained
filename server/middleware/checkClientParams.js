const routeNames = require("../utils/routeNames");

const checkClientParams = (req, res, next) => {
  const missing = [];
  let responseObject;

  switch (req.route.path) {
    case routeNames.signup:
      if (!req.body.firstName) missing.push("firstName");
      if (!req.body.lastName) missing.push("lastName");
      if (!req.body.role) missing.push("role");
      if (!req.body.email) missing.push("email");
      if (!req.body.idNo) missing.push("idNo");
      if (!req.body.password) missing.push("password");
      break;
    case routeNames.login:
      if (!req.body.email) missing.push("email");
      if (!req.body.password) missing.push("password");
      if (!req.body.role) missing.push("role");
      break;
    case routeNames.addArea:
      if (!req.body.name) missing.push("name");
      if (!req.body.areaCode) missing.push("areaCode");
      break;
    case routeNames.addAreaAdmin:
      if (!req.body.idNo) missing.push("idNo");
      break;
    case routeNames.requestAccess:
      if (!req.body.startTime) missing.push("startTime");
      if (!req.body.endTime) missing.push("endTime");
      break;
    case routeNames.endTransaction:
      if(!req.body._id) missing.push("_id");
      if(!req.body.pubKey) missing.push("pubKey");
      if(!req.body.status) missing.push("status");
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
    content: { errorCode: 0, message: missing, error: null },
  };

  res.status(400).send(responseObject);
};

module.exports = checkClientParams;
