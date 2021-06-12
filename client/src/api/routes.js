const baseUrl = "http://localhost:8080";

// const defaultConfig = {
//   method: "POST",
//   // headers: {
//   //   "Access-Control-Allow-Origin": "http://localhost:8080",
//   //   "X-Requested-With": "XMLHttpRequest",
//   // },
// };

const endpoints = {
  login: {
    method: "POST",
    url: `${baseUrl}/api/v1/login`,
  },
  signup: {
    method: "POST",
    url: `${baseUrl}/api/v1/signup`,
  },
  getAreas: {
    method: "GET",
    url: `${baseUrl}/api/v1/area`,
  },
  getArea: {
    method: "GET",
    url: `${baseUrl}/api/v1/area`,
  },
  addAreaAdmin: {
    method: "POST",
    url: `${baseUrl}/api/v1/area/:areaCode/add/admin`,
  },
  addArea: {
    method: "POST",
    url: `${baseUrl}/api/v1/area/add`,
  },
  requestAccess: {
    method: "POST",
    url: `${baseUrl}/api/v1/area/:areaCode/request`,
  },
  getTransactions: {
    method: "POST",
    url: `${baseUrl}/api/v1/transaction`,
  },
  getTransactionsByArea: {
    method: "POST",
    url: `${baseUrl}/api/v1/transaction/area/:areaId`,
  },
  getTransactionsPending: {
    method: "POST",
    url: `${baseUrl}/api/v1/transaction/pending`,
  },

  endTransaction: {
    method: "POST",
    url: `${baseUrl}/api/v1/transaction/end`,
  },
  getBlockchain: {
    method: "GET",
    url: `${baseUrl}/api/v1/blockchain`,
  },
};

export default endpoints;
