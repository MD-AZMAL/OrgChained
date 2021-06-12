const bcrypt = require("bcrypt");
const Blockchain = require("../models/Blockchain");
const promiseHandler = require("../utils/promiseHandler");

const addGenesisBlock = async () => {
  const [block, errorBlock] = await promiseHandler(
    Blockchain.find({}).sort({ _id: -1 }).limit(1)
  );

  if (errorBlock) {
    return;
  }

  if (block.length > 0) {
    return;
  }

  const blockObject = {
    prevHash: "0".repeat(60),
    transaction: null,
  };

  const [hash, errorHash] = await promiseHandler(
    bcrypt.hash(JSON.stringify(blockObject), 10)
  );

  if (errorHash) {
    return;
  }

  blockObject.currentHash = hash;

  const [genBlock, errorGenBlock] = await promiseHandler(
    Blockchain.create({ ...blockObject })
  );

  if (errorGenBlock) {
    return;
  }
};

const addToBlockchain = async (transaction) => {
  // find last block take its current hash

  const [lastBlock, errorLastBlock] = await promiseHandler(
    Blockchain.find({}).sort({ _id: -1 }).limit(1)
  );

  if (errorLastBlock) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to find block",
      error: error,
    };
  }


  if (lastBlock.length === 0) {
    throw {
      errorCode: 4,
      message: "No prev block found",
      error: null,
    };
  }

  let currentBlock = lastBlock[0];

  // make new blockObject

  const blockObject = {
    prevHash: currentBlock.currentHash,
    transaction: transaction,
  };

  // hash it
  const [hash, errorHash] = await promiseHandler(
    bcrypt.hash(JSON.stringify(blockObject), 10)
  );


  if (errorHash) {
    throw {
      errorCode: 2,
      message: "Error in hashing ",
      error: errorHash,
    };
  }

  blockObject.currentHash = hash;


  // add to blockchain
  const [block, errorBlock] = await promiseHandler(
    Blockchain.create({ ...blockObject })
  );

  if (errorBlock) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to add Block",
      error: error,
    };
  }

  return { block };
};

const getBlockchain = async (user) => {
  if (user.role != "Admin") {
    throw {
      errorCode: 2,
      message: "Not an Admin",
      error: { admin: false },
    };
  }

  const [blockchain, errorBlockchain] = await promiseHandler(
    Blockchain.find({})
      .populate({
        path: "transaction",

        populate: { path: "area", model: "Area" },
      })
      .populate({
        path: "transaction",
        populate: { path: "approvedBy", model: "User" },
      })
      .populate({
        path: "transaction",
        populate: { path: "requestedBy", model: "User" },
      })
  );

  if (errorBlockchain) {
    throw {
      errorCode: 1,
      message: "Database Error: Unable to query blockchain",
      error: errorBlockchain,
    };
  }


  let blocks = blockchain.map(({ prevHash, transaction, currentHash }) => ({
    prevHash,
    currentHash,
    transaction: transaction
      ? {
          _id: transaction._id,
          startTime: transaction.startTime,
          endTime: transaction.endTime,
          status: transaction.status,
          area: {
            name: transaction.area.name,
            areaCode: transaction.area.areaCode,
          },
          requestedBy: {
            name: `${transaction.requestedBy.firstName} ${transaction.requestedBy.lastName}`,
            idNo: transaction.requestedBy.idNo,
          },
          approvedBy: {
            name: `${transaction.approvedBy.firstName} ${transaction.approvedBy.lastName}`,
            idNo: transaction.approvedBy.idNo,
          },
        }
      : null,
  }));


  return { blockchain: blocks };
};

module.exports = { addGenesisBlock, addToBlockchain, getBlockchain };
