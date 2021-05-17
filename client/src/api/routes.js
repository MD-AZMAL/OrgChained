const baseUrl = "http://localhost:8080";

const defaultConfig = {
  method: "POST",
  // headers: {
  //   "Access-Control-Allow-Origin": "http://localhost:8080",
  //   "X-Requested-With": "XMLHttpRequest",
  // },
};

const endpoints = {
  login: {
    ...defaultConfig,
    url: `${baseUrl}/api/v1/login`,
  },
  signup: {
    ...defaultConfig,
    url: `${baseUrl}/api/v1/signup`,
  },
};

export default endpoints;
