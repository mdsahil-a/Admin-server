import express from "express";
import {addSkill} from "../controller/update.controller.js";

const updateSkillRoute=express.Router();

updateSkillRoute.post("/skill",addSkill);

export default updateSkillRoute;