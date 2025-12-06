import express from "express";
import {details,projects,contacts,skills} from "../controller/response.controller.js";

const responseRoute=express.Router();

responseRoute.get("/details",details);

responseRoute.get("/projects",projects);
responseRoute.get("/skills",skills);
responseRoute.get("/contacts",contacts);
export default responseRoute;