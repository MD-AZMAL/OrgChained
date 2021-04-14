const bcrypt = require("bcrypt");
const NodeRSA = require("node-rsa");
const User = require("../models/User");
const promiseHandler = require("../utils/promiseHandler");

const signup = async (clientParameters) => {
  // Check for existing user

  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findOne({ email: clientParameters.email })
  );

  if (existingUser) {
    throw { errorCode: 3, message: "User already exists", error: null };
  } else if (errorExistingUser) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: existingUser,
    };
  }

  // generate hashedPassword

  const [hashedPassword, errorHashedPassword] = await promiseHandler(
    bcrypt.hash(clientParameters.password, 10)
  );

  if (errorHashedPassword) {
    throw {
      errorCode: 2,
      message: "Error in hashing password",
      error: errorHashedPassword,
    };
  }

  // generate public and private key

  const key = new NodeRSA(
    { email: clientParameters.email, time: Date.now() },
    { b: 256 }
  );
  const privateKey = key.exportKey("private");
  const publicKey = key.exportKey("public");

  // add to database

  const [user, errorUser] = await promiseHandler(
    User.create({
      ...clientParameters,
      hashedPassword,
      pubK: publicKey,
      privK: privateKey,
    })
  );

  if (errorUser) {
    throw {
      errorCode: 1,
      message: "Database error : Could not add user",
      error: errorUser,
    };
  }

  return { email: user.email, role: user.role };
};

const login = async (clientParameters) => {
  // Check if user exist and has appropriate role

  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findOne({ email: clientParameters.email })
  );

  if (!existingUser) {
    throw { errorCode: 4, message: "User does not exists", error: null };
  } else if (errorExistingUser) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: existingUser,
    };
  } else if (existingUser.role !== clientParameters.role) {
    throw { errorCode: 5, message: "Invalid User role", error: null };
  }

  // Check if password matches

  const [
    hashedPasswordResult,
    errorHashedPasswordResult,
  ] = await promiseHandler(
    bcrypt.compare(clientParameters.password, existingUser.hashedPassword)
  );

  if (errorHashedPasswordResult) {
    throw {
      errorCode: 2,
      message: "Error in hashing password",
      error: errorHashedPasswordResult,
    };
  } else if (!hashedPasswordResult) {
    throw {
      errorCode: 6,
      message: "Invalid Password",
      error: null,
    };
  }

  return {
    login: hashedPasswordResult,
    email: existingUser.email,
    role: existingUser.role,
  };
};

module.exports = { signup: signup, login: login };
