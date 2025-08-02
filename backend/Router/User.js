const express = require('express');
const router=express.Router();

const {
    signup,
    login,
} = require("../controller/Auth")   
console.log("signup is:", signup);
console.log("login is:", login);



router.post("/login",login)
router.post('/signup',signup)



module.exports = router;

