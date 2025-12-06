import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                message: "Access denied. No token provided.",
                success: false 
            });
        }

        // Extract token
        const token = authHeader.substring(7);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key-change-in-production");
        
        // Add admin ID to request
        req.adminId = decoded.adminId;
        
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ 
                message: "Invalid token",
                success: false 
            });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ 
                message: "Token expired",
                success: false 
            });
        }
        console.log("Error in authentication middleware:", error.message);
        res.status(500).json({ 
            message: "Internal server error",
            success: false 
        });
    }
};

