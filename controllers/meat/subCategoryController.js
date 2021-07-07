const asyncHandler = require("../../middleware/async");
const MeatSubCategory=require("../../models/meat/subCategory");

exports.getMeatSubCategory=asyncHandler(async (req, res, next)=>{
  const allMeatSubCategory= await MeatSubCategory.find();
  res.status(200).json({
    success: true,
    count: allMeatSubCategory.length,
    data: allMeatSubCategory,
  });
});
exports.postMeatSubCategory=asyncHandler(async (req, res, next)=>{
  req.body.image=req.file.path;
  const allMeatSubCategory=await MeatSubCategory.create(req.body);
  res.status(201).json({
    success: true,
    data: allMeatSubCategory,
  });
});
