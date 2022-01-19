const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const { getProfile, postProfile } = require("../services/profile.service");

router.get("/", auth, getProfile);
router.post("/", auth, postProfile);

module.exports = router;
