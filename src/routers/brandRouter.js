const express = require("express");
const router = express.Router();
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
} = require("../controllers/brandCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

router.get("/:id", getBrand);
router.get("/", getAllBrand);

module.exports = router;
