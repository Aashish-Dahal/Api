const ErrorResponse = require("../utils/errorResponse");

const errorHandler=(err, req, res, next)=>{
  let error={...err};
  error.message=err.message;
  console.log(err.message);

  // Mongoose bad objectId
  if (err.name==="CastError") {
    const message=`Animals not found with id of ${err.value}`;
    error=new ErrorResponse(message, 404);
  }
  // Mongoose duplicate key
  if (err.code===11000) {
    const msg ="Duplicate field value entered";
    error=new ErrorResponse(msg, 400);
  }
  if (err.name==="ValidationError") {
    const message=Object.values(err.errors).map((val)=>val.message);
    error=new ErrorResponse(message, 400);
  }
  res.status(error.statusCode).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports=errorHandler;
