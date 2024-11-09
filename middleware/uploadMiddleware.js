const multer = require('multer');
const path = require('path');
const userService = require('../services/userService');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.params.event_id){
            cb(null, path.join(__dirname, '../public/event'));
            return;
        }
        else{
            cb(null, path.join(__dirname, '../public/pp'));
            return;
        }
    },
    filename: async (req, file, cb) => {
        console.log(req.params);
        if(req.params.event_id){
            const ext = path.extname(file.originalname);
            console.log(req.params.event_id);
            cb(null, `${req.params.event_id}${ext}`);
            return;
        }
        else{
        const user = await userService.getUserByEmail(req.userEmail);
        console.log(user);
        const username = user.username;
        console.log(username);

        const ext = path.extname(file.originalname);
        cb(null, `${username}${ext}`);
        return;
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

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
