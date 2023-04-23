const express = require("express");

const { validateUserBody } = require("../../utils/validateBody");
const { schemas } = require("../../models/user");
const { authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/users-controllers");

const router = express.Router();

router.post("/register", validateUserBody(schemas.userAuthSchema), ctrl.registerUser);

router.post("/login", validateUserBody(schemas.userAuthSchema), ctrl.loginUser);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch("/", authenticate, validateUserBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
