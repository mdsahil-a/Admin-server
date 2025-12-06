import express from "express";
import { updateName,updateBio,updateResume,updateProfession,updateProfilePic } from "../controller/update.controller.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage});
const updateRoute=express.Router();

updateRoute.post("/name",updateName);
updateRoute.post("/bio",updateBio);
updateRoute.post("/resume",updateResume);
updateRoute.post("/profilePic",upload.single("image"),updateProfilePic);
updateRoute.post("/profession",updateProfession);


export default updateRoute;
 
