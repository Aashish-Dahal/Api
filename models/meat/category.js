const mongoose=require('mongoose');

const meatCategory=mongoose.Schema({
    category:{
        type:String,
        required:[true,'please add a category']
    },
    categoryImage:{
        type:String,
        required:[true,'please add a categoryImage'],
      
    }

});
module.exports=mongoose.model('MeatCategory',meatCategory);