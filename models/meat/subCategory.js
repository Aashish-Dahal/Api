const mongoose=require('mongoose');
const meatSubcategory=mongoose.Schema({
    image:{
        type:String,
        required:[true,'please add a image ']
    },
    title:{
        type:String,
        required:[true,'please add a title']
    },
    price:{
        type:Number,
        required:[true,'please add a price']
    },
    quantity:{
        type:Number,
        required:[true,'please add a quantity']
    }


});
module.exports=mongoose.model("MeatSubCategory",meatSubcategory);