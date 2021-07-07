const mongoose=require("mongoose");
const parentCategorySchema=new mongoose.Schema({
  category: {
    type: String,
    required: [true, "please add a parent category"],
  },
  categoryImage: {
    type: String,
    required: [true, "please add a parent categoryImage"],
  },

});
module.exports=mongoose.model("ParentCategory", parentCategorySchema);
