const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  uploadBlogImg,
  dislikeBlog,
} = require("../controllers/blogCtrl");
const { uploadImages } = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImages");
const router = express.Router();
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likeblog/", authMiddleware, likeBlog);
router.put("/dislikeblog/", authMiddleware, dislikeBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogImgResize,
  uploadBlogImg,
);
router.put("/:id", authMiddleware, isAdmin, updateBlog);

router.get("/:id", getBlog);
router.get("/", getAllBlog);

router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
