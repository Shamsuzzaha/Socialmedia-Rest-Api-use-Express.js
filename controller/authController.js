import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";

// User registration controller
export const registerUser = async (req, res) => {
    const { userName, password, firstName, lastName } = req.body;

    try {
        // Check if username already exists
        const existingUser = await UserModel.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        // Create new user
        const user = await UserModel.create({
            userName: userName,
            password: hashPass,
            firstName: firstName,
            lastName: lastName
        })

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// User login controller
export const loginUser = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await UserModel.findOne({ userName });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user['password']);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
