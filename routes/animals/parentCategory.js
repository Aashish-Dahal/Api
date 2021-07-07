const express=require("express");
const {getParentCategory, postParentCategory} = require("../../controllers/animal/parentCategoryController");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
const router=express.Router();
router.get("/getparentcategory", getParentCategory);
router.post("/postparentcategory", protect, authorize("admin"), upload.single("categoryImage"), postParentCategory);

module.exports=router;
