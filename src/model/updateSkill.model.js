import mongoose from "mongoose";
 const skillSchema=new mongoose.Schema({
     userId:{
        type:String,
        default:"123456789"
    },
    
    name:{
        type:String,
        required:true,

    },
    Url:{
        type:String,
        required:true,
    }
});
const Skill=new mongoose.model("Skill",skillSchema);
export default Skill;