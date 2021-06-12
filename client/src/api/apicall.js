import axios from "axios";
import endpoints from "./routes";

export const loginApi = async ({ email, role, password }) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.login,
    data: {
      email,
      password,
      role,
    },
  };

  try {
    const result = await axios(requestObject);
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

  const requestObject = {
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
    const result = await axios(requestObject);
    data = result.data;

    error = null;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getAreasApi = async (token, all = false) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getAreas,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      all: all,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getAreaApi = async (token, areaCode) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getArea,
    url: endpoints.getArea.url + `/${areaCode}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const addAreaAdminApi = async (token, areaCode, idNo) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.addAreaAdmin,
    url: endpoints.addAreaAdmin.url.replace(":areaCode", areaCode),
    data: {
      idNo,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const addAreaApi = async (token, name, areaCode) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.addArea,
    data: {
      name,
      areaCode,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const requestAccessApi = async (token, startTime, endTime, areaCode) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.requestAccess,
    url: endpoints.requestAccess.url.replace(":areaCode", areaCode),
    data: {
      startTime,
      endTime,
    },
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getTransactionsApi = async (token) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getTransactions,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getTransactionsByAreaApi = async (areaId, token) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getTransactionsByArea,
    url: endpoints.getTransactionsByArea.url.replace(":areaId", areaId),
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getTransactionsPendingApi = async (token) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getTransactionsPending,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const endTransaction = async (_id, pubKey, status, token) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.endTransaction,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      _id,
      pubKey,
      status,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};

export const getBlockchainApi = async (token) => {
  let data;
  let error;

  const requestObject = {
    ...endpoints.getBlockchain,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  try {
    const result = await axios(requestObject);
    data = result.data;
  } catch (err) {
    data = null;
    error = err;
  }

  return [error, data];
};
