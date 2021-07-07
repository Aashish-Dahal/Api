const asyncHandler = require("../../middleware/async");
const farmModel=require("../../models/animal/farmCarousel");

exports.postFarmImage=asyncHandler(async (req, res, next)=>{
  req.body.farmImage=req.file.path;
  const farmImages= await farmModel.create(req.body);
  res.status(201).json({
    success: true,
    data: farmImages,
  });
});

exports.getFarmImage=asyncHandler(async (req, res, next)=>{
  const farmImages=await farmModel.find();
  res.status(200).json({
    success: true,
    count: farmImages.length,
    data: farmImages,
  });
});
