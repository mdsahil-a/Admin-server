import express from "express";
import Details from "../model/userDetail.model.js";
import Skill from "../model/updateSkill.model.js";
import Contact from "../model/updateContact.model.js";
import Project from "../model/addProject.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";


export const updateName=async (req,res)=>{
    const {name,userId}=req.body;
    try{
if(!name){
    return res.status(400).json({message:"Name is required!"});
}

const user=await Details.findOne({userId});

user.name=name;
user.save();
res.status(201).json({message:"Name updated successfully",user});



    }
    catch(error){
        console.log("error in name",error.message);
        return res.status(500).json({message:"Internal server error"});
    }

}

export const updateBio=async (req,res)=>{
    const {bio,userId}=req.body;
    try{
if(!bio){
    return res.status(400).json({message:"Bio is required"});
}
const user=await Details.findOne({userId});
user.about=bio;
user.save();
res.status(201).json({message:"Bio updated successfully"});
    }
    catch(error){

    }
}

export const updateResume=async (req,res)=>{
    
    const {resume,userId}=req.body;
    try{
if(!resume){
    return res.status(400).json({message:"Resume link is required"});
}
const user=await Details.findOne({userId});
user.resume=resume;
user.save();
res.status(201).json({message:"Resume updated successfully"});
    }
    catch(error){

    } 
}
export const updateProfession=async (req,res)=>{
    const {profession,userId}=req.body;
    try{
if(!profession){
    return res.status(400).json({message:"Profession is required!!"});
}
const user=await Details.findOne({userId});
user.profession=profession;
user.save();
res.status(201).json({message:"Profession updated successfully"});
    }
    catch(error){
console.log("error in message",error.message);
return res.status(500).json.message("Internal server error");
    }
}
// update contact to create controller.
export const updateAddress=async (req,res)=>{
    const {address,userId}=req.body;
    try{
if(!address){
    return res.status(400).json({message:"Required Address"});
}



const contact=await Contact.findOne({userId});
contact.address=address;
contact.save();
res.status(201).json({message:"Address updated successfulyy"});
    }
    catch(error){

        console.log("Error in update adress:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const updateMobile=async (req,res)=>{
    const {mobile,userId}=req.body;
    try{
if(!mobile){
    return res.status(400).json({message:"Required mobile number!!"});
}



const contact=await Contact.findOne({userId});
contact.mobile=mobile;
contact.save();
res.status(201).json({message:"Mobile updated successfulyy"});
    }
    catch(error){

        console.log("Error in update adress:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const updateFacebook=async (req,res)=>{
    const {facebook,userId}=req.body;
    try{
if(!facebook){
    return res.status(400).json({message:"Required facebook URL"});
}



const contact=await Contact.findOne({userId});
contact.facebook=facebook;
contact.save();
res.status(201).json({message:"FB link updated successfulyy"});
    }
    catch(error){

        console.log("Error in update Facebook:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const updateGithub=async (req,res)=>{
    const {github,userId}=req.body;
    try{
if(!github){
    return res.status(400).json({message:"Required github"});
}



const contact=await Contact.findOne({userId});
contact.github=github;
contact.save();
res.status(201).json({message:"Github updated successfulyy"});
    }
    catch(error){

        console.log("Error in update adress:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const updateLinkedln=async (req,res)=>{
    const {linkedln,userId}=req.body;
    try{
if(!linkedln){
    return res.status(400).json({message:"Required linkedln!!"});
}



const contact=await Contact.findOne({userId});
contact.linkedln=linkedln;
contact.save();
res.status(201).json({message:"LinkedIn updated successfulyy"});
    }
    catch(error){

        console.log("Error in update adress:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const addSkill=async (req,res)=>{
    const {name,URL}=req.body;
    try{
if(!name || !URL){
    return res.status(400).json({message:"Required name and URL"});
}


const skill=new Skill({
    name,
Url:URL
});

await skill.save();
res.status(201).json({message:"Skill added successfully"});
    }
    catch(error){

        console.log("Error in update Skill:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}


export const addProject=async (req,res)=>{
    const {name,about,URL}=req.body;
    const techs=JSON.parse(req.body.techs);
    const fileData=req.file;

    console.log(req.body);
    try{

                const image = `data:${fileData.mimetype};base64,${fileData.buffer.toString("base64")}`;
      
// if(!image || !name || !about || !techs || !URL ){
//     return res.status(400).json({message:"Bad request"});
// }

      const result = await cloudinary.uploader.upload(image);


const project=new Project({
    name,
    image:result.secure_url,
    url:URL,
    about,
    techs
});
console.log(project);
project.save();
res.status(201).json({project ,message:"Project uploaded successfully"});
    }
    catch(error){

        console.log("Error in add project:",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}


export const viewProject=async(req,res)=>{



try{

    
    const projects=await Project.find({});
    return res.status(200).json({projects});


}
catch(error){
    console.log("Error in view project:",error.message);
    return res.status(500).json({message:"Internal server error"});
}

}

export const delProject=async(req,res)=>{

const id=req.params.id;


try{

const deleteProject=await Project.findOneAndDelete({_id:id});

if(!deleteProject){
return res.status(400).json({message:"User not found"});
}

res.status(200).json({message:"Project deleted successfully"});

}
catch(error){
    console.log("Errror in delete project:",error.message);
    res.status(500).json({message:"Intenal server error"});
}

}
export const updateProfilePic = async (req, res) => {
    try {
        const fileData = req.file;

        console.log("REQ FILE:", fileData);

        if (!fileData) {
            return res.status(404).json({ message: "Image Not found!!" });
        }

        // Convert buffer → Base64
        const base64Image = `data:${fileData.mimetype};base64,${fileData.buffer.toString("base64")}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: "profile_pics",
        });

        // Update user
        let userId = "123456789";
        const user = await Details.findOne({ userId });

        user.image = result.secure_url;
        await user.save();

        return res.status(200).json({
            message: "Image updated successfully",
            success: true
        });

    } catch (error) {
        console.log("Error in upload profile pic:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
