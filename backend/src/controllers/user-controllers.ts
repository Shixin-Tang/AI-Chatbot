import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
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
