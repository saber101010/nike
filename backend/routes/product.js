const express =require ('express')
const router =express.Router()
const Product = require('../models/product')
const isAuth =require('../middelware/isAuth')
router.post('/',isAuth, async(req,res)=>{
    const {title,prix,description}=req.body
   try {
    const product =  new Product({
        title,prix,description
    })
    await product.save()
    res.send({msg:"product added",product})
   } catch (error) {
       console.log('error')
       res.send('error')
   }
})

router.get('/',async(req,res)=>{
    try {
        const products=await Product.find()
        res.send({msg:'product list',products})
    } catch (error) {
        res.send('server error')
    }
})
//delete
router.delete('/:productId',isAuth,async(req,res)=>{
    const {productId}=req.params
    try {
        await Product.findByIdAndDelete(productId)
        res.send('product delete')
    } catch (error) {
        res.send('server error')
    }
})
//put:
router.put('/:productId',isAuth,async(req,res)=>{
    const {productId}=req.params 
    // const {title,prix,description}=req.body
    try {
        await Product.findByIdAndUpdate(productId,{$set:{...req.body}})
    } catch (error) {
        res.send('server error')
    }
})
//getbyId:
router.get('/:productId',async(req,res)=>{
    const {productId}= req.params
    try {
        const product=await Product.findOne({id:productId})
        res.send(product)
    } catch (error) {
        res.send('server error')
    }
})


module.exports=router