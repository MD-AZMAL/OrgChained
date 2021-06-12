const express = require("express");
const router = express.Router();
const routeNames = require("../utils/routeNames");
const authenticateToken = require("../middleware/authenticateToken");
const { getBlockchain } = require("../controller/blockchainUtils");

router.get(routeNames.getBlockchain,authenticateToken, async (req,res) => {
    let statusCode;
    let responseObject;

    try {
        const result = await getBlockchain(req.user);
    
        statusCode = 200;
        responseObject = {
          success: true,
          route: req.route.path,
          info: "Blockchain retrieved",
          content: result,
        };
      } catch (error) {
        statusCode = 400;
        responseObject = {
          success: false,
          route: req.route.path,
          info: null,
          error: "Error while quering blockchain",
          content: error,
        };
      }
      res.status(statusCode).send(responseObject);
});

module.exports = router;
