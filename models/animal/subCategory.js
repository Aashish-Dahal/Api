const mongoose=require("mongoose");
const subCategorySchema=new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a category"],

  },
  icon: {
    type: String,
    required: [true, "pleaser add a icon"],
  },
  parentId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports=mongoose.model("subCategory", subCategorySchema);
