const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');
const User = require("../models/User");
const promiseHandler = require("../utils/promiseHandler");

const signup = async (clientParameters) => {
  // Check for existing user
  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findOne({ email: clientParameters.email })
  );

  if (existingUser) {
    throw { errorCode: 1, message: "User already exists" };
  } else if (errorExistingUser) {
    throw { errorCode: 0, message: "Database Error" };
  }

  // generate hashedPassword

  const [hashedPassword, errorHashedPassword] = await promiseHandler(bcrypt.hash(clientParameters.password, 10))

  if(errorHashedPassword) {
    throw {errorCode: 2, message: "Error in hashing password"}
  }

  // generate public and private key
  const key = new NodeRSA({email: clientParameters.email, time: Date.now()},{b: 256});
  const privateKey = key.exportKey('private');
  const publicKey = key.exportKey('public');

  // add to database
  const [user, errorUser] = await promiseHandler(User.create({
    ...clientParameters,
    hashedPassword,
    pubK: publicKey,
    privK: privateKey
  }));

  if(errorUser) {
    throw {errorCode: 0, message: "Database error"}
  }

  return {email: user.email}
};

module.exports = { signup: signup };
