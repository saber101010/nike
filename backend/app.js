const express =require('express')
const app=express()
const connectDB=require('./config/db')
const authRoutes=require('./routes/auth')
const productRoutes=require('./routes/product')
const cors=require('cors')
connectDB()

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/product',productRoutes)

const port=5000
app.listen(port,()=>console.log(`server running on port ${port}`))