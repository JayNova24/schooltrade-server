const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.get("/", (req,res)=>{
res.send("SchoolTrade Server Running 🚀")
});

app.use(express.json())
app.use(cors())

/* DATABASE CONNECTION */

mongoose.connect("mongodb+srv://SchoolTrade_admin:272006@cluster0.zhyg5m5.mongodb.net/schooltrade")

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))


/* SCHEMAS */

const User = mongoose.model("User",{

email:String,
password:String,
seller:{type:Boolean,default:false},
plan:String

})

const Product = mongoose.model("Product",{

name:String,
price:String,
category:String,
plan:String,
seller:String

})

/* REGISTER */

app.post("/register", async(req,res)=>{

const user = new User({

email:req.body.email,
password:req.body.password

})

await user.save()

res.json({message:"Account created"})

})


/* LOGIN */

app.post("/login", async(req,res)=>{

const user = await User.findOne({

email:req.body.email,
password:req.body.password

})

if(!user){

return res.json({success:false})

}

res.json({success:true,user})

})


/* BECOME SELLER */

app.post("/become-seller", async(req,res)=>{

await User.updateOne(

{email:req.body.email},

{
seller:true,
plan:req.body.plan
}

)

res.json({message:"Seller activated"})

})


/* ADD PRODUCT */

app.post("/add-product", async(req,res)=>{

const product = new Product({

name:req.body.name,
price:req.body.price,
category:req.body.category,
plan:req.body.plan,
seller:req.body.seller

})

await product.save()

res.json({message:"Product uploaded"})

})


/* GET PRODUCTS */

app.get("/products", async(req,res)=>{

const products = await Product.find()

const priority = {pro:3,moderate:2,basic:1}

products.sort((a,b)=>priority[b.plan]-priority[a.plan])

res.json(products)

})


/* SERVER */

app.listen(3000,()=>{

console.log("Server running")

})
