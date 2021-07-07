const crypto=require("crypto");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const UserSchema=new mongoose.Schema({
  name: {
    type: String,
    index: {
      unique: false,
    },
    minLength: [8, "Name must be at least 8 characters long"],
    required: [true, "please add a name"],

  },
  phone: {
    type: Number,
    required: [true, "please add a number"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Invalid password"],
    select: false,

  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password, salt);
});

// Sign JWT and return

UserSchema.methods.getSignedJwtToken=function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};
// send sms-otp


// match user entered password to hashed password in databse
UserSchema.methods.matchPassword=async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.methods.getResetPasswordToken=function() {
  // Generate token
  const resetToken=crypto.randomBytes(20).toString("hex");
  // hash token and set to resetPasswordToken field
  this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

  // set expire
  this.resetPasswordExpire=Date.now()+10*60*1000;
  return resetToken;
};


module.exports=mongoose.model("User", UserSchema);
