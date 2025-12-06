import mongoose from "mongoose";
 const ProjectSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    techs:[String],
    url:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"",
    }
});
const Project=new mongoose.model("Project",ProjectSchema);
export default Project;