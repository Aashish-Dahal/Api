const express=require("express");
const {getShopImage, postShopImage} = require("../../controllers/animal/shopImageController");
const {authorize, protect} = require("../../middleware/auth");
const upload=require("../../utils/multer");
const router=express.Router();
router.get("/getshopimage", getShopImage);
router.post("/postshopimage", protect, authorize("admin"), upload.single("shopImage"), postShopImage);
module.exports=router;
