import axios from "axios";
import endpoints from "./routes";

export const loginApi = async ({ email, role, password }) => {
  const login = endpoints.login;
  let data;
  let error;

  const requrestObject = {
    method: login.method,
    url: login.url,
    data: {
      email,
      password,
      role,
    },
  };

  try {
    const result = await axios(requrestObject);
    data = result.data;

    error = null;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const signupApi = async ({
  firstName,
  lastName,
  email,
  role,
  idNo,
  password,
}) => {
  const signup = endpoints.signup;
  let data;
  let error;

  const requrestObject = {
    method: signup.method,
    url: signup.url,
    data: {
      firstName,
      lastName,
      email,
      role,
      password,
      idNo,
    },
  };

  try {
    const result = await axios(requrestObject);
    data = result.data;

    error = null;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};
