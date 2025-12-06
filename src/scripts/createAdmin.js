import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../model/admin.model.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to database
        await connectDB();
        
        // Check if admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            console.log("Admin already exists!");
            console.log("Username:", existingAdmin.username);
            console.log("Email:", existingAdmin.email);
            process.exit(0);
        }
        
        // Get admin details from command line arguments or use defaults
        const username = process.argv[2] || "admin";
        const email = process.argv[3] || "admin@example.com";
        const password = process.argv[4] || "admin123";
        
        // Create admin
        const admin = new Admin({
            username,
            email,
            password
        });
        
        await admin.save();
        
        console.log("Admin created successfully!");
        console.log("Username:", admin.username);
        console.log("Email:", admin.email);
        console.log("\nYou can now login with these credentials.");
        console.log("\nTo create admin with custom credentials:");
        console.log("node src/scripts/createAdmin.js <username> <email> <password>");
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();

