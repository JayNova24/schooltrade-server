const express=require("express")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

let users=[]

app.post("/register",(req,res)=>{

users.push(req.body)

res.json({message:"User registered successfully"})

})

app.post("/login",(req,res)=>{

const user=users.find(u=>u.email===req.body.email)

if(user){

res.json({message:"Login successful"})

}else{

res.json({message:"User not found"})

}

})

app.get("/",(req,res)=>{
res.send("SchoolTrade Server Running")
})

app.listen(3000,()=>{
console.log("Server running")
})
