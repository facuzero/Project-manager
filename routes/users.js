const express = require("express");
const checkToken = require("../middlewares/checkToken");
const router = express.Router();

const { profile } = require("../controllers/usersController");

/* /api/users */
router.get("/profile", checkToken, profile);
module.exports = router;
