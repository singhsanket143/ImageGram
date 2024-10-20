import { createUser, findUserByEmail } from "../repositories/userRepository.js"
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt.js";
export const signupUserService = async (user) => {
    try {
        const newUser = await createUser(user);

        return newUser;
    } catch (error) {
        if(error.name === "MongoServerError" && error.code === 11000) {
            throw {
                status: 400,
                message: "User with the same email or username already exists"
            }
        }
        throw error;
    }
}

export const signinUserService = async (userDetails) => {
    try {
        // 1. Check if there is a valid registsred user with the email
        const user = await findUserByEmail(userDetails.email);
        if(!user) {
            throw {
                status: 404,
                message: "User not found"
            }
        }

        // 2. Compare the password
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid) {
            throw {
                status: 401,
                message: "Invalid password"
            }
        }

        const token = generateJwtToken({ email: user.email, _id: user._id, username: user.username, role: user.role || "user"  });

        return token;


    } catch (error) {
        throw error;
    }
}

export const checkIfUserExists = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}