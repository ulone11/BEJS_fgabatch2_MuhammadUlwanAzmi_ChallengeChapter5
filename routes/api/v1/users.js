var express = require("express");
const UserController = require("../../../controllers/users.controller");
var router = express.Router();
var AUTH_MIDDLEWARE = require("../../../middlewares/auth.middleware");

router.get("/", AUTH_MIDDLEWARE, UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUsersWithProfile);
router.delete("/:id", UserController.deleteUsersById);

module.exports = router;
