const mongoose =require( 'mongoose');

const dietMealSchema=mongoose.Schema({
    type:{
        type:String,
        enum:['Vegetarian','Non-Vegetarian'],
        default:'Non-Vegetarian',
        required:[true,'please add a type']
    },
    foodName:{
        type:String,
        required:[true,'please add foodName']
    },
    foodFor:{
     type:String,
     required:[true,'please add foodFor']

    },
    description:{
        type:String,
        required:[true,'please add a description']
    },
    kcal:{
       type:Number,
       required:[true,'please add a Kcal']
    },
    fat:{
        type:Number,
        required:[true,'please add a fat']
    },
    protein:{
        type:Number,
        required:[true,'please add a protein']
    },
    carbs:{
        type:Number,
        required:[true,'please add a carbs']
    },

    price:{
        type:Number,
        required:[true,'please add a price']
    },
    weight:{
        type:Number,

        required:[true,'please add a number']
    },
    image:{
        type:String,
        required:[true,'please add a image']
    }

});
module.exports=mongoose.model("DietMeal",dietMealSchema);