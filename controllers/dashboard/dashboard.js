const asyncHandler = require("../../middleware/async");

exports.indexView=asyncHandler((req, res, next)=>{
  res.render("home");
});
exports.loginView=asyncHandler((req, res, next)=>{
  res.render("login");
});
