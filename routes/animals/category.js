const express=require("express");
const {getCategory, postCategory} = require("../../controllers/animal/categoryController");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
const router=express.Router();
router.get("/getcategory", getCategory);
router.post("/postcategory", protect, authorize("admin"), upload.single("categoryImage"), postCategory);

module.exports=router;
