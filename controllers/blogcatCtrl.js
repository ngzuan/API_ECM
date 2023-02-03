const Blcategory = require("../models/blogcatModel");
const asyncHandle = require("express-async-handler");
const { validateMongooseDBId } = require("../util/validateMongoDb");

const createCategory = asyncHandle(async (req, res) => {
  try {
    const category = await Blcategory.create(req.body);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const updateCategory = await Blcategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const deleteCategory = await Blcategory.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const getCategory = await Blcategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandle(async (req, res) => {
  try {
    const getAllCategory = await Blcategory.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
