import { signupUserService } from "../services/userService.js";

export async function getProfile(req, res) {
    // return unimplemented
    return res.status(501).json({
        success: false,
        message: "Not Implemented"
    });
}

export async function signup(req, res) {
    try {
        const user = await signupUserService(req.body);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}