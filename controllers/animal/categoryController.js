const asyncHandler = require("../../middleware/async");
const category = require("../../models/animal/category");


exports.getCategory=asyncHandler(async (req, res, next)=>{
  const allCategory=await category.find();
  res.status(200).json({
    success: true,
    count: allCategory.length,
    data: allCategory,
  });
});

exports.postCategory=asyncHandler(async (req, res, next)=>{
  req.body.categoryImage=req.file.path;
  const allCategory=await category.create(req.body);
  res.status(201).json({
    success: true,
    data: allCategory,
  });
});
