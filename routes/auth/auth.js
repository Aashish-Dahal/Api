/* eslint-disable max-len */
const express=require("express");
const {register, login, getMe, forgotPassword, verifyOTP, resendOTP, getAll}=require("../../controllers/auth/auth");
const {protect}=require("../../middleware/auth");

// eslint-disable-next-line new-cap
const router=express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/loginuser", protect, getMe);
router.get("/alluser", getAll);
router.post("/verifyOTP", verifyOTP);
router.post("/resendOTP", protect, resendOTP);
router.post("/forgotpassword", forgotPassword);


module.exports=router;
