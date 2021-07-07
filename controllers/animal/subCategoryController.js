const asyncHandler = require("../../middleware/async");
const subCategory=require("../../models/animal/subCategory");

exports.getSubCategory=asyncHandler(async (req, res, next)=>{
  const allSubCategory=await subCategory.find();
  res.status(200).json({
    success: true,
    count: allSubCategory.length,
    data: allSubCategory,
  });
});
exports.getSubCategoryById=asyncHandler(async (req, res, next)=>{
  const allSubCategory=await subCategory.find({parentId: req.params.id});

  res.status(200).json({
    success: true,
    count: allSubCategory.length,
    data: allSubCategory,
  });
});
exports.postSubCategory=asyncHandler(async (req, res, next)=>{
  req.body.parentId=req.params.id;
  req.body.icon=req.file.path;
  const allSubCategory=await subCategory.create(req.body);
  res.status(201).json({
    success: true,
    data: allSubCategory,
  });
});
