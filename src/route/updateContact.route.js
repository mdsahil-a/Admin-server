import express from "express";
import {updateAddress,updateMobile,updateGithub,updateFacebook,updateLinkedln} from "../controller/update.controller.js";

const updateContactRoute=express.Router();

updateContactRoute.post("/address",updateAddress);
updateContactRoute.post("/mobile",updateMobile);
updateContactRoute.post("/fb",updateFacebook);
updateContactRoute.post("/github",updateGithub);
updateContactRoute.post("/linkedln",updateLinkedln);
export default updateContactRoute;