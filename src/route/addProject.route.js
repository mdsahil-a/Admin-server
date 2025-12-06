import express from 'express';
import { addProject ,viewProject,delProject} from '../controller/update.controller.js';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage});
const projectRoute=express.Router();

projectRoute.post("/add",upload.single("image"),addProject);
projectRoute.get("/view",viewProject);
projectRoute.delete("/delete/:id",delProject)

export default projectRoute;