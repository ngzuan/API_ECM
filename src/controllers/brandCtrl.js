const Brand = require("../models/brandModel");
const asyncHandle = require("express-async-handler");
const { validateMongooseDBId } = require("../util/validateMongoDb");

const createBrand = asyncHandle(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const getBrand = await Brand.findById(id);
    res.json(getBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrand = asyncHandle(async (req, res) => {
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
