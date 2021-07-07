/* eslint-disable max-len */
const express=require("express");
const {getMeatCategory, postMeatCategory} = require("../../controllers/meat/categoryController");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
// eslint-disable-next-line new-cap
const router=express.Router();
router.get("/getmeatcategory", getMeatCategory);
router.post("/postmeatcategory", upload.single("categoryImage", 5), protect, authorize("admin"), postMeatCategory);

module.exports=router;
