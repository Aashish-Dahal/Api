const asyncHandler = require("../../middleware/async");
const MeatCategory=require("../../models/meat/category");

exports.getMeatCategory=asyncHandler(async (req, res, next)=>{
  const allMeatCategory= await MeatCategory.find();
  res.status(200).json({
    success: true,
    count: allMeatCategory.length,
    data: allMeatCategory,
  });
});
exports.postMeatCategory=asyncHandler(async (req, res, next)=>{
  req.body.categoryImage=req.file.path;
  const allMeatCategory=await MeatCategory.create(req.body);
  res.status(201).json({
    success: true,
    data: allMeatCategory,
  });
});
