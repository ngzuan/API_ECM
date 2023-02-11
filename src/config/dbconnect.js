const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.Mongoose_DB);
    console.log("database connect");
  } catch (err) {
    console.log("data connect err");
  }
};
module.exports = dbConnect;
