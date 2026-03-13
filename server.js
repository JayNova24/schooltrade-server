const express=require("express")
const cors=require("cors")
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://SchoolTrade_admin:272006@cluster0.zhyg5m5.mongodb.net/schooltrade")

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))
const app=express()

app.use(express.json())
app.use(cors())
// User Schema for MongoDB
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

const User = mongoose.model("User", UserSchema)


app.post("/register", async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    res.json({ message: "User registered" })
  } catch (err) {
    res.json({ message: "Error saving user" })
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

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
