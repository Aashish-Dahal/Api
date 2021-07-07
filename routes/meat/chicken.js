/* eslint-disable max-len */
const express=require("express");
const {getChickenCategory, postChickenCategory} = require("../../controllers/meat/chicken");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
// eslint-disable-next-line new-cap
const router=express.Router();
router.get("/get", getChickenCategory);
router.post("/post", upload.single("image"), protect, authorize("admin"), postChickenCategory);
module.exports=router;
