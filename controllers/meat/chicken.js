const asyncHandler = require("../../middleware/async");
const chickenCategory=require("../../models/meat/chicken");

exports.getChickenCategory=asyncHandler(async (req, res, next)=>{
  const allChicken= await chickenCategory.find();
  res.status(200).json({
    success: true,
    count: allChicken.length,
    data: allChicken,
  });
});
exports.postChickenCategory=asyncHandler(async (req, res, next)=>{
  req.body.image=req.file.path;
  const allChicken=await chickenCategory.create(req.body);
  res.status(201).json({
    success: true,
    data: allChicken,
  });
});
