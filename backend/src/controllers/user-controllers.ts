import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //get all users
        const users = await User.find();
        //send response
        return res
            .status(200)
            .json({ message: "find all users data success", users });
    } catch (error) {
        //handle error
        console.log(error);
        return res.status(200).json({
            message: "find all users data ERROR",
            cause: (error as Error).message,
        });
    }
};

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        //hash password
        const hashedPassword = await hash(password, 10);
        //save user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        //send response
        return res.status(200).json({
            message: "user signup success",
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        //handle error
        console.log(error);
        return res.status(200).json({
            message: "user signup ERROR",
            cause: (error as Error).message,
        });
    }
};
