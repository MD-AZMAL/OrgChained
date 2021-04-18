const baseUrl = "http://localhost:8080";

const endpoints = {
  login: { method: "POST", url: `${baseUrl}/api/v1/login` },
  signup: { method: "POST", url: `${baseUrl}/api/v1/signup` },

};

export default endpoints;
