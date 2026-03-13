const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

/* ---------------- DATABASE CONNECTION ---------------- */

mongoose.connect("mongodb+srv://SchoolTrade_admin:272006@cluster0.zhyg5m5.mongodb.net/schooltrade")

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

/* ---------------- USER SCHEMA ---------------- */

const UserSchema = new mongoose.Schema({

  name:String,
  email:String,
  password:String,

  sellerStatus:{
    type:String,
    default:"free"
  }

})

const User = mongoose.model("User",UserSchema)

/* ---------------- PRODUCT SCHEMA ---------------- */

const ProductSchema = new mongoose.Schema({

  name:String,
  price:Number,
  description:String,
  seller:String,
  email:String,
  image:String,
  category:String,

  status:{
    type:String,
    default:"pending"
  },

  views:{
    type:Number,
    default:0
  }

})

const Product = mongoose.model("Product",ProductSchema)

/* ---------------- SERVER TEST ---------------- */

app.get("/",(req,res)=>{
  res.send("SchoolTrade Marketplace API Running")
})

/* ---------------- REGISTER ---------------- */

app.post("/register", async (req,res)=>{

  const user = new User(req.body)

  try{

    await user.save()

    res.json({message:"User registered successfully"})

  }catch(err){

    res.json({message:"Registration failed"})

  }

})

/* ---------------- LOGIN ---------------- */

app.post("/login", async (req,res)=>{

  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user){
    return res.json({message:"User not found"})
  }

  if(user.password === password){

    res.json({message:"Login successful",user})

  }else{

    res.json({message:"Incorrect password"})

  }

})

/* ---------------- SELLER UPGRADE ---------------- */

app.post("/upgrade-seller", async (req,res)=>{

  const {email} = req.body

  await User.findOneAndUpdate(

    {email:email},

    {sellerStatus:"pending"}

  )

  res.json({message:"Seller upgrade request submitted"})

})

/* ---------------- VERIFY SELLER ---------------- */

app.post("/verify-seller/:id", async (req,res)=>{

  await User.findByIdAndUpdate(

    req.params.id,

    {sellerStatus:"verified"}

  )

  res.json({message:"Seller verified"})

})

/* ---------------- ADD PRODUCT ---------------- */

app.post("/add-product", async (req,res)=>{

  const {email} = req.body

  const user = await User.findOne({email})

  if(!user){
    return res.json({message:"User not found"})
  }

  if(user.sellerStatus !== "verified"){
    return res.json({message:"Seller not verified"})
  }

  const product = new Product(req.body)

  await product.save()

  res.json({message:"Product submitted for approval"})

})

/* ---------------- APPROVE PRODUCT ---------------- */

app.post("/approve-product/:id", async (req,res)=>{

  await Product.findByIdAndUpdate(

    req.params.id,

    {status:"approved"}

  )

  res.json({message:"Product approved"})

})

/* ---------------- GET MARKETPLACE PRODUCTS ---------------- */

app.get("/products", async (req,res)=>{

  const products = await Product.find({status:"approved"})

  res.json(products)

})

/* ---------------- GET PRODUCTS BY CATEGORY ---------------- */

app.get("/products/category/:category", async (req,res)=>{

  const products = await Product.find({
    category:req.params.category,
    status:"approved"
  })

  res.json(products)

})

/* ---------------- PRODUCT VIEW COUNTER ---------------- */

app.post("/view-product/:id", async (req,res)=>{

  await Product.findByIdAndUpdate(

    req.params.id,

    {$inc:{views:1}}

  )

  res.json({message:"View counted"})

})

/* ---------------- TRENDING PRODUCTS ---------------- */

app.get("/trending", async (req,res)=>{

  const products = await Product
  .find({status:"approved"})
  .sort({views:-1})
  .limit(10)

  res.json(products)

})

/* ---------------- SERVER START ---------------- */

app.listen(10000,()=>{

  console.log("SchoolTrade Server Running")

})  const user = await User.findOne({ email: email })

  if (!user) {
    return res.json({ message: "User not found" })
  }

  if (user.password === password) {
    res.json({ message: "Login successful", user: user })
  } else {
    res.json({ message: "Incorrect password" })
  }
})

app.get("/",(req,res)=>{
res.send("SchoolTrade Server Running")
})

app.listen(3000,()=>{
console.log("Server running")
})
