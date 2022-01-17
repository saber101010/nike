const mongoose=require('mongoose')
require('dotenv').config()


const connectDB=async()=>{
    try {
      await  mongoose.connect(process.env.MONGOURI)
      console.log('db connected')
    } catch (error) {
        console.log('db not connected')
    }
}

module.exports=connectDB