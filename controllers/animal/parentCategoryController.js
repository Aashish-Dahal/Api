const asyncHandler = require("../../middleware/async");
const parentCategory = require("../../models/animal/parentCategory");

exports.getParentCategory=asyncHandler(async (req, res, next)=>{
  const allCategory=await parentCategory.find();
  res.status(200).json({
    success: true,
    count: allCategory.length,
    data: allCategory,
  });
});

exports.postParentCategory=asyncHandler(async (req, res, next)=>{
  req.body.categoryImage=req.file.path;
  const allCategory=await parentCategory.create(req.body);
  res.status(201).json({
    success: true,
    data: allCategory,
  });
});
