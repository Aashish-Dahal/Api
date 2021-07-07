const express=require("express");
const {getSubCategory, postSubCategory, getSubCategoryById} = require("../../controllers/animal/subCategoryController");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
const router=express.Router();
router.get("/getsubcategory", getSubCategory);
router.get("/getsubcategorybyid/:id", getSubCategoryById);
router.post("/postsubcategory/:id", protect, authorize("admin"), upload.single("icon"), postSubCategory);

module.exports=router;
