const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema({
  category: {
    type: String,
    required: [true, "please add a category"],
  },
  categoryImage: {
    type: String,
    required: [true, "please add a categoryImage"],
  },
  

});
module.exports=mongoose.model("Category", categorySchema);
