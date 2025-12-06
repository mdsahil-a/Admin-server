import Admin from "../model/admin.model.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_SECRET || "your-secret-key-change-in-production", {
        expiresIn: "7d"
    });
};

// Login controller
export const login = async (req, res) => {
    
    try {
        const { username, password } = req.body;
       

        if (!username || !password) {
            return res.status(400).json({ 
                message: "Username and password are required",
                success: false 
            });
        }

        const admin = await Admin.findOne({
            $or: [{ username }, { email: username }]
        });

        if (!admin) {
            return res.status(401).json({ 
                message: "Invalid credentials",
                success: false 
            });
        }


        const isPasswordValid = await admin.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "Invalid credentials",
                success: false 
            });
        }
        const token = generateToken(admin._id);

        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
        });

    } catch (error) {
        console.log("Error in login:", error.message);
        res.status(500).json({ 
            message: "Internal server error",
            success: false 
        });
    }
};

// Register controller (optional - for creating first admin)
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: "All fields are required",
                success: false 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                message: "Password must be at least 6 characters",
                success: false 
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
            $or: [{ username }, { email }]
        });

        if (existingAdmin) {
            return res.status(400).json({ 
                message: "Admin already exists",
                success: false 
            });
        }

        // Create new admin
        const admin = new Admin({
            username,
            email,
            password
        });

        await admin.save();

        // Generate token
        const token = generateToken(admin._id);

        res.status(201).json({
            message: "Admin created successfully",
            success: true,
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
        });

    } catch (error) {
        console.log("Error in register:", error.message);
        res.status(500).json({ 
            message: "Internal server error",
            success: false 
        });
    }
};

// Verify token controller
export const verifyToken = async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select("-password");
        
        if (!admin) {
            return res.status(404).json({ 
                message: "Admin not found",
                success: false 
            });
        }

        res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
        });

    } catch (error) {
        console.log("Error in verify token:", error.message);
        res.status(500).json({ 
            message: "Internal server error",
            success: false 
        });
    }
};

