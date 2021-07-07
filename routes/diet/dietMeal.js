/* eslint-disable max-len */
const express =require( "express");
const {getDietMeal, postDietMeal}= require( "../../controllers/diet/dietMeal");
const {authorize, protect} =require( "../../middleware/auth");
const upload =require("../../utils/multer");
// eslint-disable-next-line new-cap
const router=express.Router();

router.get("/get", getDietMeal);
router.post("/post", upload.single("image"), protect, authorize("admin"), postDietMeal);
module.exports=router;
