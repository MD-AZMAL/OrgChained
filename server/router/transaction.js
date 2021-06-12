const express = require("express");
const router = express.Router();
const routeNames = require("../utils/routeNames");
const checkClientParams = require("../middleware/checkClientParams");
const authenticateToken = require("../middleware/authenticateToken");
const { requestAccess, getTransactions, getTransactionsPending,getTransactionsByArea, endTransaction } = require("../controller/transactionUtil");

router.post(
  routeNames.requestAccess,
  checkClientParams,
  authenticateToken,
  async (req, res) => {
    let statusCode;
    let responseObject;
    let clientParameters = { ...req.body, ...req.params };

    try {
      const result = await requestAccess(clientParameters, req.user);

      statusCode = 200;
      responseObject = {
        success: true,
        route: req.route.path,
        info: "Request posted successfully",
        content: result,
      };
    } catch (error) {
      statusCode = 400;
      responseObject = {
        success: false,
        route: req.route.path,
        info: null,
        error: "Error while requesting",
        content: error,
      };
    }
    res.status(statusCode).send(responseObject);
  }
);

router.post(routeNames.getTransactions, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await getTransactions(req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Transaction retrieved",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while quering",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.post(routeNames.getTransactionsByArea, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;


  let clientParameters = {...req.params};

  try {
    const result = await getTransactionsByArea(clientParameters,req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Transaction retrieved",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while quering",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.post(routeNames.getTransactionsPending, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await getTransactionsPending(req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Transaction retrieved",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while quering",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.post(routeNames.endTransaction, checkClientParams, authenticateToken, async (req,res) => {
  let statusCode;
  let responseObject;
  let clientParameters = { ...req.body };

  try {
    const result = await endTransaction(clientParameters,req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Transaction ended",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while ending transaction",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});



module.exports = router;
