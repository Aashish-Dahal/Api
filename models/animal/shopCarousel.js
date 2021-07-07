const mongoose=require("mongoose");
const shopCarousel=new mongoose.Schema({
  shopImage: {
    type: String,
    required: [true, "please add a shopImage"],
  },
});

module.exports=mongoose.model("ShopCarousel", shopCarousel);
