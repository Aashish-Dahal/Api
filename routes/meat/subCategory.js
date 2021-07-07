/* eslint-disable max-len */
const express=require("express");
const {getMeatSubCategory, postMeatSubCategory} = require("../../controllers/meat/subCategoryController");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
// eslint-disable-next-line new-cap
const router=express.Router();
router.get("/get", getMeatSubCategory);
router.post("/post", upload.single("image"), protect, authorize("admin"), postMeatSubCategory);
module.exports=router;
