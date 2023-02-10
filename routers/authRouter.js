const express = require("express");
const {
  createUser,
  loginUser,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOder,
  getOrder,
  updateOrder,
} = require("../controllers/userCtl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.get("/logout", logout);
router.post("/usercart", authMiddleware, userCart);
router.post("/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOder);
router.get("/get-orders", authMiddleware, getOrder);
router.put("/order/updateOder/:id", authMiddleware, isAdmin, updateOrder);
router.get("/cart", authMiddleware, getUserCart);
router.get("/all-user", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);

router.put("/password", authMiddleware, updatePassword);
router.delete("/:id", deleteaUser);
router.put("/edit_user", authMiddleware, updateaUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
