const mongoose=require("mongoose");
require("dotenv").config();

const {MONGODB_URL}=process.env.MONGODB_URL;

exports.connect=()=>{
    mongoose.connect("mongodb+srv://mohdadeeb409:vB0lrywd5jywMqU7@cluster0.pmmejpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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
