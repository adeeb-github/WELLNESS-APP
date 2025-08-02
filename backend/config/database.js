const mongoose=require("mongoose");
require("dotenv").config();

const {MONGODB_URL}=process.env.MONGODB_URL;

exports.connect=()=>{
    mongoose.connect("mongodb://localhost:27017/welnessArvyax", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    });
}
