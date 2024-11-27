const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/db.Connect.js");
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
dbConnect();
const app = express();

//Middleware
app.use(cors({ origin: "http://localhost:3000" })); 
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes) 
app.use("/api/user",userRoutes)

//Start the Server
const PORT = process.env.PORT || 7002;
app.get('/',(request,response)=>{                   // This use to check my server is running on browser or not 
    //server to client-side
    response.json({
        message :  "Server is running " + PORT
    })  
})
app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});