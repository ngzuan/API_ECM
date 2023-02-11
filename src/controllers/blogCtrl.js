const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const fs = require("fs");
const asyncHandle = require("express-async-handler");
const { validateMongooseDBId } = require("../util/validateMongoDb");
const cloudinaryUPloading = require("../util/cloudinary");

const createBlog = asyncHandle(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBlog = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getBlog = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMongooseDBId(id);
  try {
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("disLikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true },
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBlog = asyncHandle(async (req, res) => {
  try {
    const getAllBlog = await Blog.find();
    res.json(getAllBlog);
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = asyncHandle(async (req, res) => {
  const { blogId } = req.body;
  validateMongooseDBId(blogId);
  try {
    const blog = await Blog.findById(blogId);
    const loginUserId = req?.user?._id;
    const isLiked = blog?.isLiked;
    const alreadyDislike = blog?.disLikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString(),
    );
    console.log(alreadyDislike);

    if (alreadyDislike) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisLiked: false,
        },
        {
          new: true,
        },
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        },
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        {
          new: true,
        },
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const dislikeBlog = asyncHandle(async (req, res) => {
  const { blogId } = req.body;
  validateMongooseDBId(blogId);
  try {
    const blog = await Blog.findById(blogId);
    const loginUserId = req?.user?._id;
    const disLiked = blog?.isDisLiked;
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString(),
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        },
      );
      res.json(blog);
    }
    if (disLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisLiked: false,
        },
        {
          new: true,
        },
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { disLikes: loginUserId },
          isDisLiked: true,
        },
        {
          new: true,
        },
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const uploadBlogImg = asyncHandle(async (req, res) => {
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
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true },
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlog,
  getBlog,
  getAllBlog,
  likeBlog,
  dislikeBlog,
  uploadBlogImg,
};
