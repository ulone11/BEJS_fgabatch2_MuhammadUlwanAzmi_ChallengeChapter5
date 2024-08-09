var express = require("express");
var router = express.Router();
const authController = require("../../../../controllers/auth.controller");
const UserController = require("../../../../controllers/users.controller");
const authMiddleware = require("../../../../middlewares/auth.middleware");

router.get("/login", authController.loginUser);
router.post("/register", UserController.createUserWithProfile);
router.get("/authenticate", authMiddleware, authController.authCheck);

module.exports = router;
