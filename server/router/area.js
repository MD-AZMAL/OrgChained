const express = require("express");
const router = express.Router();
const routeNames = require("../utils/routeNames");
const checkClientParams = require("../middleware/checkClientParams");
const authenticateToken = require("../middleware/authenticateToken");
const {
  addArea,
  addAreaAdmin,
  getAreas,
  getArea,
} = require("../controller/areaUtils");

router.use(express.urlencoded({ extended: true }));

router.post(
  routeNames.addArea,
  checkClientParams,
  authenticateToken,
  async (req, res) => {
    let statusCode;
    let responseObject;

    try {
      const result = await addArea(req.body, req.user);

      statusCode = 200;
      responseObject = {
        success: true,
        route: req.route.path,
        info: "area added successfully",
        content: result,
      };
    } catch (error) {
      statusCode = 400;
      responseObject = {
        success: false,
        route: req.route.path,
        info: null,
        error: "Error while adding area",
        content: error,
      };
    }
    res.status(statusCode).send(responseObject);
  }
);

router.post(
  routeNames.addAreaAdmin,
  checkClientParams,
  authenticateToken,
  async (req, res) => {
    let statusCode;
    let responseObject;
    let clientParameters = { ...req.body, ...req.params };

    try {
      const result = await addAreaAdmin(clientParameters, req.user);

      statusCode = 200;
      responseObject = {
        success: true,
        route: req.route.path,
        info: "area admin added successfully",
        content: result,
      };
    } catch (error) {
      statusCode = 400;
      responseObject = {
        success: false,
        route: req.route.path,
        info: null,
        error: "Error while adding area admin",
        content: error,
      };
    }
    res.status(statusCode).send(responseObject);
  }
);

router.get(routeNames.getAreas, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;

  const clientParameters = { ...req.query };

  try {
    const result = await getAreas(clientParameters, req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Areas found",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while finding areas",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.get(routeNames.getArea, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await getArea(req.params.areaCode, req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Areas found",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while finding areas",
      content: error,
    };
  }

  res.status(statusCode).send(responseObject);
});

module.exports = router;
