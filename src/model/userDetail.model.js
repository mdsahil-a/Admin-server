import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        default:"123456789"
    },

   name:{
    type:String,
    required:true,
    default:"Jigyasa"
},
about:{
    type:String,
    required:true,
    default:"Currently learning to build dynamic and responsive web applications.I enjoy working with Web development technologies. I'm passionate about solving problems through code and continuously improving my skills by working on personal projects and exploring new tools and frameworks."

},
profession:{
    type:String,
    required:true,
    default:"Web developer",
},
resume:{
    type:String,
    required:true,
    default:"https://drive.google.com/uc?export=download&amp;id=1dFpdZy6ow3G1ntzXKx0guEXk3iqJRxzZ"

},
image:{
    type:String,
    default:"",
}

});
const Details=new mongoose.model("Details",userSchema);
export default Details;

    