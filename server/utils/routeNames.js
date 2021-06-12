const routeNames = {
  signup: "/api/v1/signup",
  login: "/api/v1/login",
  getAreas: "/api/v1/area",
  getArea: "/api/v1/area/:areaCode",
  addArea: "/api/v1/area/add",
  addAreaAdmin: "/api/v1/area/:areaCode/add/admin",
  requestAccess: "/api/v1/area/:areaCode/request",
  getTransactions: "/api/v1/transaction",
  getTransactionsByArea: '/api/v1/transaction/area/:areaId',
  getTransactionsPending: "/api/v1/transaction/pending",
  endTransaction: "/api/v1/transaction/end",
  getBlockchain: "/api/v1/blockchain"
};

module.exports = routeNames;
