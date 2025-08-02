const express = require('express');
const app=express();
const userRouter = require('./Router/User');
const database = require('./config/database');
const cors=require('cors');
const sessionRouter = require('./Router/SessionRoutes');


const dotenv = require('dotenv');
const { listenerCount } = require('./Models/User');
dotenv.config();

const PORT=process.env.PORT||5000;

database.connect();

app.use(express.json());

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    }
));
app.use("/auth",userRouter)
app.use("/session",sessionRouter)


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is running",
    });


});

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);

})