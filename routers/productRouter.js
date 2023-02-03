const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages,
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const {
  productImgResize,
  uploadPhoto,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.post("/wishlist", authMiddleware, addToWishList);
router.get("/", getAllProduct);
router.put("/rating", authMiddleware, rating);
router.put(
  "/update/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("image", 10),
  productImgResize,
  uploadImages,
);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
