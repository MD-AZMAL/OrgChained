const User = require("../models/User");
const Area = require("../models/Area");
const Transaction = require("../models/Transaction");

const promiseHandler = require("../utils/promiseHandler");
const mongoose = require("mongoose");
const { addToBlockchain } = require("./blockchainUtils");
const NodeRSA = require("node-rsa");

const requestAccess = async (clientParameters, user) => {
  let startTime = new Date(clientParameters.startTime);
  let endTime = new Date(clientParameters.endTime);

  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findById(user._id)
  );

  if (!existingUser) {
    throw {
      errorCode: 4,
      message: "Invalid user id",
      error: null,
    };
  } else if (errorExistingUser) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: errorExistingUser,
    };
  }

  const [existingArea, errorExistingArea] = await promiseHandler(
    Area.findOne({ areaCode: clientParameters.areaCode }).populate("areaAdmins")
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

  const [transaction, errorTransaction] = await promiseHandler(
    Transaction.create({
      startTime: startTime,
      endTime: endTime,
      requestedBy: existingUser,
      area: existingArea,
      areaAdmins: existingArea.areaAdmins,
      status: "Pending",
    })
  );

  if (errorTransaction) {
    throw {
      errorCode: 1,
      message: "Database error : Could not add area",
      error: errorTransaction,
    };
  }

  return {
    id: transaction._id,
    startTime: transaction.startTime,
    endTime: transaction.endTime,
    status: transaction.status,
  };
};

const getTransactions = async (user) => {
  let transactions, errorTransactions;

  if (user.role === "Admin") {
    [transactions, errorTransactions] = await promiseHandler(
      Transaction.find({})
        .sort({ _id: -1 })
        .populate("area")
        .populate("requestedBy")
        .populate("approvedBy")
    );
  } else {
    [transactions, errorTransactions] = await promiseHandler(
      Transaction.find({
        $or: [
          { areaAdmins: user._id },
          { requestedBy: user._id },
          { approvedBy: user._id },
        ],
      })
        .sort({ _id: -1 })
        .populate("area")
        .populate("requestedBy")
        .populate("approvedBy")
    );
  }

  if (errorTransactions) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query transactions",
      error: errorTransactions,
    };
  }

  transactions = transactions.map(
    ({
      _id,
      startTime,
      endTime,
      status,
      areaAdmins,
      area,
      requestedBy,
      approvedBy,
    }) => ({
      _id,
      startTime,
      endTime,
      status,
      area: { name: area.name, areaCode: area.areaCode },
      requestedBy: {
        name: `${requestedBy.firstName} ${requestedBy.lastName}`,
        idNo: requestedBy.idNo,
        pubKey: requestedBy.pubK,
      },
      approvedBy: approvedBy
        ? {
            name: `${approvedBy.firstName} ${approvedBy.lastName}`,
            idNo: approvedBy.idNo,
          }
        : null,
      admin:
        areaAdmins.includes(mongoose.Types.ObjectId(user._id)) ||
        user.role === "Admin"
          ? true
          : false,
    })
  );

  return { transactions };
};

const getTransactionsByArea = async (clientParameters, user) => {
  const [transactions, errorTransactions] = await promiseHandler(
    Transaction.find({ area: clientParameters.areaId })
      .sort({ _id: -1 })
      .populate("area")
      .populate("requestedBy")
      .populate("approvedBy")
  );


  if (errorTransactions) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query transactions",
      error: errorTransactions,
    };
  }

  let trans = transactions.map(
    ({
      _id,
      startTime,
      endTime,
      status,
      areaAdmins,
      area,
      requestedBy,
      approvedBy,
    }) => ({
      _id,
      startTime,
      endTime,
      status,
      area: { name: area.name, areaCode: area.areaCode },
      requestedBy: {
        name: `${requestedBy.firstName} ${requestedBy.lastName}`,
        idNo: requestedBy.idNo,
        pubKey: requestedBy.pubK,
      },
      approvedBy: approvedBy
        ? {
            name: `${approvedBy.firstName} ${approvedBy.lastName}`,
            idNo: approvedBy.idNo,
          }
        : null,
      admin:
        areaAdmins.includes(mongoose.Types.ObjectId(user._id)) ||
        user.role === "Admin"
          ? true
          : false,
    })
  );

  return { transactions: trans };
};

const getTransactionsPending = async (user) => {
  let transactions, errorTransactions;
  if (user.role === "Admin") {
    [transactions, errorTransactions] = await promiseHandler(
      Transaction.find({ status: "Pending" })
        .sort({ _id: -1 })
        .populate("area")
        .populate("requestedBy")
        .populate("approvedBy")
    );
  } else {
    [transactions, errorTransactions] = await promiseHandler(
      Transaction.find({ areaAdmins: user._id, status: "Pending" })
        .sort({ _id: -1 })
        .populate("area")
        .populate("requestedBy")
        .populate("approvedBy")
    );
  }


  if (errorTransactions) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query transactions",
      error: errorTransactions,
    };
  }

  transactions = transactions.map(
    ({
      _id,
      startTime,
      endTime,
      status,
      areaAdmins,
      area,
      requestedBy,
      approvedBy,
    }) => ({
      _id,
      startTime,
      endTime,
      status,
      area: { name: area.name, areaCode: area.areaCode },
      requestedBy: {
        name: `${requestedBy.firstName} ${requestedBy.lastName}`,
        idNo: requestedBy.idNo,
        pubKey: requestedBy.pubK,
      },
      approvedBy: approvedBy
        ? {
            name: `${approvedBy.firstName} ${approvedBy.lastName}`,
            idNo: approvedBy.idNo,
          }
        : null,
      admin:
        areaAdmins.includes(mongoose.Types.ObjectId(user._id)) ||
        user.role === "Admin"
          ? true
          : false,
    })
  );

  return { transactions };
};

const endTransaction = async (clientParameters, user) => {
  // find the transaction
  const [transaction, errorTransactions] = await promiseHandler(
    Transaction.findById(clientParameters._id).populate("requestedBy")
  );

  if (!transaction) {
    throw {
      errorCode: 2,
      message: "No transaction found",
      error: null,
    };
  }

  if (errorTransactions) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query transactions",
      error: errorTransactions,
    };
  }

  // check for user
  if (
    !(
      transaction.areaAdmins.includes(mongoose.Types.ObjectId(user._id)) ||
      user.role === "Admin"
    )
  ) {
    throw {
      errorCode: 3,
      message: "Not an admin Access Error",
      error: null,
    };
  }

  // varify signature
  const testString = "loremUpsum";
  const publicKey = new NodeRSA(clientParameters.pubKey);
  const privateKey = new NodeRSA(transaction.requestedBy.privK);
  const encryptedText = publicKey.encrypt(testString, "base64");
  const decrypt = privateKey.decrypt(encryptedText, "utf8");

  if (decrypt !== testString) {
    throw {
      errorCode: 5,
      message: "Invalid signature",
      error: null,
    };
  }

  const [existingUser, errorExistingUser] = await promiseHandler(
    User.findById(user._id)
  );

  if (!existingUser) {
    throw {
      errorCode: 4,
      message: "Invalid user id",
      error: null,
    };
  } else if (errorExistingUser) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query user",
      error: errorExistingUser,
    };
  }

  // change the status
  try {
    transaction.status = clientParameters.status;
    transaction.approvedBy = existingUser;
    transaction.save();
  } catch (error) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to add user",
      error: error,
    };
  }

  // add to blockchain
  let result;
  try {
    result = await addToBlockchain(transaction);
  } catch (error) {
    throw error;
  }

  return { result };
};

module.exports = {
  requestAccess,
  getTransactions,
  getTransactionsPending,
  endTransaction,
  getTransactionsByArea,
};
