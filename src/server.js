import express from "express";
import { connectDB } from "./lib/db.js";
import updateRoute from "./route/updateDetails.route.js";
import updateContactRoute from "./route/updateContact.route.js";
import projectRoute from './route/addProject.route.js'
import responseRoute from "./route/response.route.js";
import dotenv from "dotenv";
import updateSkillRoute from "./route/updateSkill.route.js";
import authRoute from "./route/auth.route.js";
import cors from "cors";
console.log();
 const app=express();
 dotenv.config();
 app.use(cors());
app.use(express.json());
 app.use("/api/auth", authRoute);
 app.use("/api/update",updateRoute);
 app.use("/api/contact",updateContactRoute);
 app.use("/api/skill",updateSkillRoute);
 app.use("/api/project",projectRoute);
 app.use("/api/response",responseRoute);







 app.listen(5000, ()=>{
    console.log("server is running at:http://localhost//5000");
    connectDB();
 })