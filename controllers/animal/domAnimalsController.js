
const domAnimals=require("../../models/animal/domAnimals");
const asyncHandler=require("../../middleware/async");
const ErrorResponse=require("../../utils/errorResponse");
const ContentBasedRecommender=require("../../utils/contentBasedRecomendation");


exports.getGoats=asyncHandler( async (req, res, next)=>{
  const animals=await domAnimals.find();

  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});

exports.getRelated=asyncHandler(async (req, res, next)=>{
  const animals=await domAnimals.find();
  const traindocuments=[];
  const id=req.params.id;
  animals.forEach((element)=>{
    traindocuments.push({
      id: element.id,
      content: element.shortDescription,

    });
  });

  const recommender=new ContentBasedRecommender({minScore: 0.1, maxSimilarDocuments: 100});
  recommender.train(traindocuments);
  const similarDocuments=recommender.getSimilarDocuments(id, 0.1, 5);
  const related=await Promise.all(similarDocuments.map(async (data)=>{
    return await domAnimals.findById(data.id).select().exec();
  }));
  res.status(200).json({
    sucess: true,
    count: related.length,
    data: related,
  });
});
exports.getLocationRelated=asyncHandler(async (req, res, next)=>{
  const animals=await domAnimals.find();
  const traindocuments=[];
  const id=req.params.id;
  animals.forEach((element)=>{
    traindocuments.push({
      id: element.id,
      content: element.shortDescription,

    });
  });
  const recommender=new ContentBasedRecommender({minScore: 0.1, maxSimilarDocuments: 100});
  recommender.train(traindocuments);
  const similarDocuments=recommender.getSimilarDocuments(id, 0.1, 5);
  const related=await Promise.all(similarDocuments.map(async (data)=>{
    return await domAnimals.findById(data.id).select().exec();
  }));
  res.status(200).json({
    sucess: true,
    data: related,
  });
});


exports.getGoat=asyncHandler(async (req, res, next)=>{
  const animals=await domAnimals.findById(req.params.id);
  if (!animals) {
    return next(new ErrorResponse(`Animlas not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});


exports.khasi=asyncHandler( async (req, res, next)=>{
  const animals=await domAnimals.find({category: "khasi"});
  if (!animals) {
    return next(new ErrorResponse("Animlas not found with id of ", 404));
  }
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});


exports.boka=asyncHandler( async (req, res, next)=>{
  const animals=await domAnimals.find({category: "boka"});
  if (!animals) {
    return next(new ErrorResponse("Animlas not found with id of ", 404));
  }
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});

exports.changra=asyncHandler( async (req, res, next)=>{
  const animals=await domAnimals.find({category: "changra"});
  if (!animals) {
    return next(new ErrorResponse("Animlas not found with id of ", 404));
  }
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});

exports.veda=asyncHandler( async (req, res, next)=>{
  const animals=await domAnimals.find({category: "veda"});
  if (!animals) {
    return next(new ErrorResponse("Animlas not found with id of ", 404));
  }
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});

exports.bhakra=asyncHandler( async (req, res, next)=>{
  const animals=await domAnimals.find({category: "bhakra"});
  if (!animals) {
    return next(new ErrorResponse("Animlas not found with id of ", 404));
  }
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});


exports.categorySearch=asyncHandler(async (req, res, next)=>{
  const category=req.query.category;
  const regex=new RegExp(category, "i");
  const animals=await domAnimals.find({category: regex});
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  },

  );
});

exports.titleSearch=asyncHandler(async (req, res, next)=>{
  const title=req.query.title;

  const regex=new RegExp(title, "i");

  const animals=await domAnimals.find({title: regex});
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals});
});
exports.allSearch=asyncHandler(async (req, res, next)=>{
  const animals=await domAnimals.find(req.query);
  if (animals.length==0) {
    res.status(200).json({
      sucess: true,
      count: animals.length,
      data: "Data is not available!",
    });
  } else {
    res.status(200).json({
      sucess: true,
      count: animals.length,
      data: animals});
  }
});

exports.createGoat=asyncHandler(async (req, res, next)=>{
  // Add user req,body
  req.body.user=req.user.id;
  if (req.files) {
    let path="";
    req.files.forEach((files, index, arr)=>path=path+files.path+",");
    path=path.substring(0, path.lastIndexOf(","));
    path=path.split(",");
    req.body.goatImage=path;
  }

  const animals=await domAnimals.create(req.body);
  res.status(201).json({
    sucess: true,
    data: animals,
  });
});

exports.updateGoat=asyncHandler(async (req, res, next)=>{
  let animals=await domAnimals.findById(req.params.id);
  if (!animals) {
    return next(new ErrorResponse(`Animlas not found with id of ${req.params.id}`, 404));
  }
  if (animals.user.toString()!==req.user.id) {
    return next(new ErrorResponse(`User ${req, params.id} is not authorized to update this animals`, 401));
  }
  req.body.goatImage=req.file.path;
  animals= await domAnimals.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

  res.status(200).json({
    sucess: true,
    data: animals,
  });
});


exports.getRelatedUserPost=asyncHandler(async (req, res, next)=>{
  const userId=req.user.id;
  const animals=await domAnimals.find({user: userId});
  res.status(200).json({
    sucess: true,
    count: animals.length,
    data: animals,
  });
});

exports.deleteGoat=asyncHandler(async (req, res, next)=>{
  const animals=await domAnimals.findById(req.params.id);
  if (!animals) {
    return next(new ErrorResponse(`Animlas not found with id of ${req.params.id}`, 404));
  }
  if (animals.user.toString()!==req.user.id) {
    return next(new ErrorResponse(`User ${req, params.id} is not authorized to update this bootcamp`, 401));
  }
  animals.remove();
  res.status(200).json({
    sucess: true,
    data: {},
  });
});
