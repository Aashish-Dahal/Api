const express=require("express");
const {getFarmImage, postFarmImage} = require("../../controllers/animal/farmImageController");
const {protect, authorize} = require("../../middleware/auth");
const upload=require("../../utils/multer");
const router=express.Router();
router.get("/getfarmimage", getFarmImage);
router.post("/postfarmimage", protect, authorize("admin"), upload.single("farmImage"), postFarmImage);

module.exports=router;
