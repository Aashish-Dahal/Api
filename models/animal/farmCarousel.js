const mongoose=require("mongoose");
const farmCarousel=new mongoose.Schema({
  farmImage: {
    type: String,
    required: [true, "please add a farmImage"],
  },
});
module.exports=mongoose.model("FarmImage", farmCarousel);
