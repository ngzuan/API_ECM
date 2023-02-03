const Product = require("../models/productModel");
const User = require("../models/userModel");
const cloudinaryUPloading = require("../util/cloudinary");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const crypto = require("crypto");
const fs = require("fs");
const { validateMongooseDBId } = require("../util/validateMongoDb");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Not find a Product");
    }
    const aProduct = await Product.findById(id);
    res.json(aProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join("");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join("");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    //Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const number = await Product.countDocuments();
      if (skip > number) throw new Error("This is Page dose not Exist");
    }

    const product = await query;
    res.json(product);
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const update = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(update);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json({
      massage: "The product has been deleted ",
      deleteProduct,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const addToWishList = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const _id = req.user._id;
  try {
    const user = await User.findById(_id);
    const alreadyAdd = user.wishlist.find((id) => id.toString() === postId);

    console.log(alreadyAdd);
    if (alreadyAdd) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: postId },
        },
        {
          new: true,
        },
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: postId },
        },
        {
          new: true,
        },
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString(),
    );

    if (alreadyRated) {
      let updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        },
      );
      res.json(updateRating);
    } else {
      let rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true },
      );
      res.json(rateProduct);
    }
    const getAllRating = await Product.findById(prodId);
    let totalRating = getAllRating.ratings.length;
    let sumRating = getAllRating.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(sumRating / totalRating);

    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      },
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const uploader = (path) => cloudinaryUPloading(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true },
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages,
};
