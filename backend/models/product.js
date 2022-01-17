const mongoose =require('mongoose')
const schema =mongoose.Schema

const productSchema= new schema({
    title:{
     type:String ,
     required:true
    },
    prix:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        
    }
})


module.exports=mongoose.model('Product',productSchema)