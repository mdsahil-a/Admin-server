import mongoose from "mongoose";
export const connectDB = async()=>{
    try{

        const con=await  mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb are connected succcessfully");

    }
    catch(error){
        console.log("error in database",error.message);
    
    }
}