const express=require( "express");
const {indexView, loginView} = require("../../controllers/dashboard/dashboard");
// eslint-disable-next-line new-cap
const router=express.Router();
router.get("/login", loginView);
router.get("/admin", indexView);
module.exports=router;
