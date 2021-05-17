import axios from "axios";
import endpoints from "./routes";

export const loginApi = async ({ email, role, password }) => {
  let data;
  let error;

  const requrestObject = {
   ...endpoints.login,
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
  let data;
  let error;

  const requrestObject = {
   ...endpoints.signup,
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
