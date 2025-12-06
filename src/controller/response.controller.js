import express from "express";
import Details from "../model/userDetail.model.js";
import Skill from "../model/updateSkill.model.js";
import Contact from "../model/updateContact.model.js";
import Project from "../model/addProject.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";



export const details =async(req,res)=>{
 
    
try{
let userId="123456789";
const user=await Details.findOne({userId});
console.log(user);
if(!user){
    return res.status(404).json({message:"User not found!!"});
}

return res.status(200).json({user});

    
}catch(error){
    console.log("Erron in get details:",error.message);
    return res.status(500).json({message:"Internal server error"});
}

}
export const projects=async(req,res)=>{
    try{

const project=await Project.find({});
return res.status(200).json({project});
    }
    catch(error){
        console.log("errror in message",error.message);
       return res.status(500).json({message:"interval server error"});
    }
}
export const contacts=async(req,res)=>{
    try{
        const contact=await Contact.findOne({});
        if(!contact){
          return res.status(400).json({message:"error in message"});
        }
        return res.status(200).json({contact});

    }
    catch(error){
        console.log("error in message",error.message);
        return res.status(500).json({message:"internal server error"});
    }
}

export const skills=async(req,res)=>{
    try{
const skill=await Skill.find({});
if(!skill){

    return res.status(404).json({message:"skill not found"});
}
return res.status(200).json({skill});



    }
    catch(error){
        console.log("error in message",error.message);
        return res.status(500).json({message:"internal server error"});
    }
}