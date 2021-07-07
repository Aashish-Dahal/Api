const asyncHandler = require("../../middleware/async");
const shopModel=require("../../models/animal/shopCarousel");

exports.postShopImage=asyncHandler(async (req, res, next)=>{
  req.body.shopImage=req.file.path;
  const shopImages= await shopModel.create(req.body);
  res.status(201).json({
    success: true,
    data: shopImages,
  });
});

exports.getShopImage=asyncHandler(async (req, res, next)=>{
  const shopImages=await shopModel.find();
  res.status(200).json({
    success: true,
    count: shopImages.length,
    data: shopImages,
  });
});
