
const ErrorResponse=require("../../utils/errorResponse");
const domAnimals=require("../../models/animal/domAnimals");
const asyncHandler=require("../../middleware/async");
const crypto=require("crypto");
const client=require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const User=require("../../models/auth/user");


exports.register=asyncHandler(async (req, res, next)=>{
  const otp=Math.floor(1000+Math.random()*9000);
  const {name, phone, password, role}=req.body;
  const regex=/[9][8][0-9]{8}$/;
  if (String(phone).match(regex)) {
    const validTime=2*60*1000;
    const expires=Date.now()+validTime;
    const data=`${phone}.${otp}.${expires}`;
    const hash=crypto.createHmac("sha256", process.env.SMS_SECRET_KEY).update(data).digest("hex");
    const fullHash=`${hash}.${expires}`;

    const user=await User.create({
      name,
      phone,
      password,
      role,
    });

    //   !user.phone?null:await client.messages.create({
    //     body:`Your OTP code is ${otp}`,
    //     from:+18644682809,
    //     to:"+977"+phone,
    //   });


    const token=user.getSignedJwtToken();
    res.json({
      sucess: true,
      hash: fullHash,
      token: token,

    });
  } else {
    return next(new ErrorResponse("Invalid phone number", 400));
  }
});
exports.resendOTP=asyncHandler(async (req, res, next)=>{
  const otp=Math.floor(1000+Math.random()*9000);
  const phone=req.user.phone;
  const phoneno=phone;
  const validTime=2*60*1000;
  const expires=Date.now()+validTime;
  const data=`${phoneno}.${otp}.${expires}`;
  const hash=crypto.createHmac("sha256", process.env.SMS_SECRET_KEY).update(data).digest("hex");
  const fullHash=`${hash}.${expires}`;
  await client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: +18644682809,
    to: phoneno,
  });
  res.json({
    sucess: true,
    phone: "+977"+phoneno,
    hash: fullHash,
  });
});

exports.verifyOTP=asyncHandler(async (req, res, next)=>{
  const uotp=req.body.otp;
  const hash=req.body.hash;
  const phone=req.body.phone;
  const [hashvalue, expires]=hash.split(".");
  const now=Date.now();
  if (now > parseInt(expires)) {
    return res.status(504).json({
      message: "Timeout pls Try again.",
    });
  }
  const data=`${phone}.${uotp}.${expires}`;
  const newHash=crypto.createHmac("sha256", process.env.SMS_SECRET_KEY).update(data).digest("hex");
  if (newHash==hashvalue) {
    res.status(200).json({
      message: "You has been successfully registered",
    });
  } else {
    return next(new ErrorResponse("OTP is incorrect", 400));
  }
});

exports.login=asyncHandler(async (req, res, next)=>{
  const {phone, password}=req.body;
  console.log(req.headers["content-type"]);
  // //validate email & password
  if (!phone || !password) {
    return next(new ErrorResponse("Please provide an phone and password", 400));
  }
  // check for user
  const user=await User.findOne({phone}).select("+password");
  // if(user.phone==phone){
  //     return next(new ErrorResponse(`The number ${user.phone} was already entered`,401));
  // }
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches

  const isMatch=await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // create token
  const token=user.getSignedJwtToken();

  if (req.headers["content-type"]==="application/x-www-form-urlencoded") {
    res.redirect("/admin");
  } else {
    res.status(200).json({sucess: true, token: token});
  }
});

exports.getMe=asyncHandler(async (req, res, next)=>{
  const user=await User.findById(req.user.id);
  res.status(200).json({
    sucess: true,
    data: user,
  });
});
exports.getAll=asyncHandler(async (req, res, next)=>{
  const user=await User.find();
  res.status(200).json({
    sucess: true,
    count: user.length,
    data: user,
  });
});


exports.forgotPassword=asyncHandler(async (req, res, next)=>{
  const user=await User.findOne({phone: req.body.phone});
  if (!user) {
    next(new ErrorResponse("There is no user with that phone number", 404));
  }
  // Get reset token
  const resetToken=user.getResetPasswordToken();
  console.log(resetToken);
  await user.save({validateBeforeSave: false});

  res.status(200).json({
    sucess: true,
    data: user,
  });
});

