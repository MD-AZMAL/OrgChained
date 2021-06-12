const User = require("../models/User");
const Area = require("../models/Area");
const promiseHandler = require("../utils/promiseHandler");
const mongoose = require("mongoose");

const addArea = async (clientParameters, user) => {
  // check for admin
  if (user.role != "Admin") {
    throw {
      errorCode: 2,
      message: "Not an Admin",
      error: { admin: false },
    };
  }

  const [existingArea, errorExistingArea] = await promiseHandler(
    Area.findOne({ areaCode: clientParameters.areaCode })
  );

  // check for existing area
  if (existingArea) {
    throw {
      errorCode: 3,
      message: "Area already exists",
      error: null,
    };
  } else if (errorExistingArea) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query area",
      error: errorExistingArea,
    };
  }

  // add area
  const [area, errorArea] = await promiseHandler(
    Area.create({
      ...clientParameters,
    })
  );

  if (errorArea) {
    throw {
      errorCode: 1,
      message: "Database error : Could not add area",
      error: errorArea,
    };
  }

  return { name: area.name, areaCode: area.areaCode };
};

const addAreaAdmin = async (clientParameters, user) => {
  if (user.role != "Admin") {
    throw {
      errorCode: 2,
      message: "Not an Admin",
      error: { admin: false },
    };
  }

  // find the area
  const [existingArea, errorExistingArea] = await promiseHandler(
    Area.findOne({ areaCode: clientParameters.areaCode })
  );

  if (!existingArea) {
    throw {
      errorCode: 6,
      message: "Invalid area code",
      error: null,
    };
  } else if (errorExistingArea) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query area",
      error: errorExistingArea,
    };
  }

  // find the user by id
  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findOne({ idNo: clientParameters.idNo })
  );

  if (!existingUser) {
    throw {
      errorCode: 4,
      message: "Invalid user idNo",
      error: null,
    };
  } else if (errorExistingUser) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: errorExistingUser,
    };
  }

  // check if admin exist
  const [existingAdminInArea, errorExistingAdminInArea] = await promiseHandler(
    Area.findOne({
      areaCode: clientParameters.areaCode,
      areaAdmins: existingUser._id,
    })
  );

  if (existingAdminInArea) {
    throw {
      errorCode: 5,
      message: "Admin exists",
      error: null,
    };
  } else if (errorExistingAdminInArea) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: errorExistingAdminInArea,
    };
  }

  // add the admin to the array
  try {
    existingArea.areaAdmins.push(existingUser);
    existingArea.save();
  } catch (error) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to add user",
      error: error,
    };
  }

  return {
    areaCode: existingArea.areaCode,
  };
};

const getAreas = async (clientParams, user) => {
  let areas, errorAreas;


  // if admin return all areas

  if (user.role === "Admin" || clientParams.all !== "false") {
    [areas, errorAreas] = await promiseHandler(Area.find({}));
  } else {
    // if user check for if he is area admin then return them
    [areas, errorAreas] = await promiseHandler(
      Area.find({ areaAdmins: user._id })
    );
  }

  if (errorAreas) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query areas",
      error: errorAreas,
    };
  }

  return { areas };
};

const getArea = async (areaCode, user) => {
  // if admin return area info with the admins list
  // if not admin show only basic area info

  let area, errorArea;

  // if admin return all areas
  if (user.role === "Admin") {
    [area, errorArea] = await promiseHandler(
      Area.findOne({ areaCode: areaCode }).populate("areaAdmins")
    );
  } else {
    // if user check for if he is area admin then return them

    [area, errorArea] = await promiseHandler(
      Area.findOne({ areaCode: areaCode, areaAdmins: user._id }).populate(
        "areaAdmins"
      )
    );
  }

  if (errorArea) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query area",
      error: errorArea,
    };
  }

  area = area.toObject();

  area.areaAdmins = area.areaAdmins.map(
    ({ _id, firstName, lastName, role, email, idNo }) => ({
      _id,
      firstName,
      lastName,
      role,
      email,
      idNo,
    })
  );

  return { area };
};

module.exports = { addArea, addAreaAdmin, getAreas, getArea };
