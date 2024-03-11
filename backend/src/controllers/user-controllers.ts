import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
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
        //check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(401).json({
                message: "user signup ERROR",
                cause: "email already registered",
            });
        }
        //hash password
        const hashedPassword = await hash(password, 10);
        //save user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        // create cookie and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        //create token
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        //send response
        return res.status(201).json({
            message: "user signup success",
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

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user login
        const { email, password } = req.body;
        //find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "user login ERROR",
                cause: "email not registered",
            });
        }
        //compare password
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({
                message: "user login ERROR",
                cause: "password not match",
            });
        }

        // clear cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        //create token
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        //send response
        return res.status(200).json({
            message: "user login success",
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        //handle error
        console.log(error);
        return res.status(200).json({
            message: "user login ERROR",
            cause: (error as Error).message,
        });
    }
};

export const userVerigfy = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "user verify ERROR",
                cause: "user id not registered or token malfunctioned",
            });
        }

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "user verify ERROR",
                cause: "token didn't match with user id",
            });
        }

        //send response
        return res.status(200).json({
            message: "user verify success",
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        //handle error
        console.log(error);
        return res.status(200).json({
            message: "user verify ERROR",
            cause: (error as Error).message,
        });
    }
};
