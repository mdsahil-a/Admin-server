import mongoose from "mongoose";
 const contactSchema=new mongoose.Schema({
     userId:{
        type:String,
        default:"123456789"
    },
    
    address:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:String,
        required:true,
    },
    facebook:{
        type:String,
        required:true,
    },
    github:{
        type:String,
        required:true,
    },
    linkedln:{
        type:String,
        required:true,
    }
});
const Contact=new mongoose.model("Contact",contactSchema);
export default Contact;