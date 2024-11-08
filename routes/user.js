const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/myprofile', userController.myProfile);
router.put('/update', userController.updateUser);
router.get('/email', userController.getUserByEmail);
module.exports = router;