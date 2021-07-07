const mongoose=require("mongoose");
const slugify=require("slugify");
const geoCoder=require("../../utils/geocoder");
const domAnimalsSchema=new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    minLength: 5,
    maxLength: [20, "Title can't be more than 20 characters"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    lowercase: true,
  },
  shortDescription: {
    type: String,
    required: [true, "Please add a description"],
  },
  estimatedWeight: {
    type: Number,
    required: [true, "Please add a weight"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  color: {
    type: String,
    required: [true, "Please add a color"],
    minLength: 3,
    maxLength: 10,
  },
  goatTeeth: {
    type: Number,
    required: [true, "Please add a goatTeeth"],
  },

  ownerName: {
    type: String,
    required: [true, "Please add a name"],
    maxLength: [20, "Title can't be more than 20 characters"],

  },
  address: {
    type: String,
    required: [true, "Please add a address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  primaryContact: {
    type: Number,

    required: [true, "Please add a contact"],
  },
  secondaryContact: {
    type: Number,

  },
  age: {
    type: Number,
    required: [true, "Please add a age"],
  },
  goatImage: {
    type: [String],
    required: [true, "Please add a image"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

});

// Geocode & create location field
domAnimalsSchema.pre("save", async (next)=>{
  const loc=await geoCoder.geocode(this.address);
  this.location={
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].state,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  // Do not save address in DB
  this.address=undefined;
  next();
});

module.exports=mongoose.model("DomesticAnimals", domAnimalsSchema);
