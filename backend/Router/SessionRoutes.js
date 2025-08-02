const express = require("express");
const { createSession}= require("../controller/Session");
const { auth } = require("../middleware/auth"); // assuming JWT middleware
const {getSessionData}=require("../controller/Session");


const {getMySessionData}=require("../controller/Session");
const { deletesession } = require("../controller/Session");
const{addsession}=require("../controller/Session");

const router = express.Router();

router.post("/createsession",auth, createSession);
router.get("/sessions",getSessionData);
router.get("/my-sessions",getMySessionData);
router.delete("/delete/:id",deletesession);
router.put("/publish/:id",addsession);
module.exports = router;
