const asyncHandler =require( "../../middleware/async");
const dietMeal =require( "../../models/diet/dietMeal");

exports.getDietMeal=asyncHandler(async (req, res, next)=>{
  const allDietMeal=await dietMeal.find();
  res.status(200).json({
    success: true,
    count: allDietMeal.length,
    data: allDietMeal,
  });
});
exports.postDietMeal=asyncHandler(async (req, res, next)=>{
  req.body.image=req.file.path;
  const allDietMeal=await dietMeal.create(req.body);
  res.status(201).json({
    success: true,
    data: allDietMeal,
  });
});
