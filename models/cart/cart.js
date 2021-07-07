const mongoose=require('mongoose');
const cartList=mongoose.Schema({
    productName:{
        type:String,
        required:[true,'please add a product Name']
    },  
    
    quantity:{
        type:Number,
        required:[true,'please add a quntity'],
    },
    totalPrice:{
        type:Number,
        required:[true,'please add a Total Price']
    }
});
module.exports=mongoose.model("CartProduct",cartList);