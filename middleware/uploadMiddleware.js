const multer = require('multer');
const path = require('path');
const userService = require('../services/userService');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.params.event_id) {
            cb(null, path.join(__dirname, '../public/event'));
        } else {
            cb(null, path.join(__dirname, '../public/pp'));
        }
    },
    filename: async (req, file, cb) => {
        if (req.params.event_id) {
            const ext = path.extname(file.originalname);
            console.log(req.params.event_id);
            cb(null, `${req.params.event_id}${ext}`);
        } else {
            const user = await userService.getUserByEmail(req.userEmail);
            const username = user.username;

            const ext = path.extname(file.originalname);
            cb(null, `${username}${ext}`);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png formats are allowed!'));
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = upload;
