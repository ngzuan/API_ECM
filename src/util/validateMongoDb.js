const mongoose = require("mongoose");

const validateMongooseDBId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This is not Valid or not found");
};

module.exports = { validateMongooseDBId };
