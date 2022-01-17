const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth_middleware = require("../middlewares/validate-token");
const { upload } = require("../helpers/filehelper");

/* GET home page. */
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/token",
  auth_middleware.verifyRefreshToken,
  authController.getAccessToken
);
router.get("/logout", auth_middleware.verifyToken, authController.logout);
router.post("/userInfo", authController.personalInformation);
router.put("/uploadFile", upload.single("file"), authController.addPhoto);
router.put("/updateUser", authController.updateUserInfo);

module.exports = router;
