const express = require('express');
const multer = require('multer');
const router = express.Router();
const api = require('../controller/api')
const user_api = require('../controller/user_api')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
//multer middleware
let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + "_"+Date.now()+"_"+file.originalname)
    },
});
let upload = multer({
    storage:storage,
}).single('image');
router.post("/register",user_api.register);
router.post("/login",user_api.login);
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), user_api.Profile);
router.get("/",api.fetchAllPost);
router.get("/:id",api.fetchPostByID);
router.post("/",upload,api.createPost);
router.patch("/:id",upload,api.updatePost);
router.delete("/:id",api.deletePost);
module.exports = router;