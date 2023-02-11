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

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - fistname
 *        - lastname
 *        - email
 *        - mobile
 *        - password
 *      properties:
 *        fistname:
 *          type: string
 *          description: enter first name
 *          example: nguyen
 *        lastname:
 *          type: string
 *          description: enter last name
 *          example: tuan
 *        email:
 *          type: string
 *          description: your email
 *          example: nvtuan181102@gmail.com
 *        mobile:
 *          type: string
 *          description: enter mobile
 *          example: 0325870125
 *        password:
 *          type: string
 *          description: enter password
 *          example: 1111
 *    CreateUserresponse:
 *      type: object
 *      properties:
 *        fistname:
 *          type: string
 *        lastname:
 *          type: string
 *        email:
 *          type: string
 *        mobile:
 *          type: string
 *        password:
 *          type: string
 *        _id:
 *          type: string
 *        createAt:
 *          type: string
 *        updateAt:
 *          type: string
 *
 */

/**
 * @swagger
 * /api/v1/user/register:
 *    post:
 *      tags:
 *        - User
 *      summary: register user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/User'
 *        responses:
 *          200:
 *            description: register user
 *            content:
 *               application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: successfully!
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/CreateUserresponse'
 *
 *
 */
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
