const Coupon = require("../models/couponModel");
const { validateMongooseDBId } = require("../util/validateMongoDb");
const asyncHandle = require("express-async-handler");

const createCoupon = asyncHandle(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCoupon = asyncHandle(async (req, res) => {
  try {
    const allCoupon = await Coupon.find();
    res.json(allCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deleteCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
};
