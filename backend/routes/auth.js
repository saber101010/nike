const express =require ('express')
const res = require('express/lib/response')
const User = require('../models/user')
const router =express.Router()
const {registerRules,validator,loginRules} = require('../middelware/validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const isAuth = require('../middelware/isAuth')

//methode post
router.post('/signup',[registerRules,validator],async(req,res)=>{
    const {name,email,password}=req.body
    try {
        //check user:
       
        const user = await User.findOne({email})
        if(user){
            console.log('hello')
            return res.status('400').send({errors:[{msg:"email is exist"}]})
        }
      
        const newUser= new User({
            name,email,password
        })
          //hash password
          const salt=10
          const hashpassword= await bcrypt.hash(password,salt)
          newUser.password=hashpassword


        await newUser.save()

        // token
        const payload={
            id:newUser._id
        }
        const token = jwt.sign(payload,process.env.mysecret, { expiresIn: '1h' })

        res.send({newUser,token})
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

//signin:
router.post('/signin',[loginRules,validator],async(req,res)=>{
    const{email,password}=req.body
    try {
        //check user:
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({errors:[{msg:'email is not exist'}]})
        }
    //check password:
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).send({errors:[{msg:'password is not exist'}]})
    }
    //token:
    const payload={
        id:user._id
    }
    const token = jwt.sign(payload,process.env.mysecret, { expiresIn: '1h' })

    res.send({user,token})

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})
//current/req.headers/methode get ::
router.get('/current',isAuth,async(req,res)=>{
  try {
      const user= await User.findById(req.user.id)
      res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send('server error')
  }
})



module.exports=router