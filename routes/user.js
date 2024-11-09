const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const {verifyAdminToken} = require("../middleware/authMiddleware");

router.get('/myprofile', userController.myProfile);
router.put('/update', userController.updateUser);
router.get('/all', verifyAdminToken, userController.getAllUsers);
router.get('/send_image', (req, res) => {
    res.render('send_image.pug')
});
router.post('/send_image', upload.single('image'), userController.sendImage);
router.get('/:user_id/get_image', userController.getImage);
module.exports = router;