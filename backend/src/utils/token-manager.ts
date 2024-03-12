import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = {
        id,
        email,
    };

    const jwtSecret = process.env.JWT_SECRET as string;

    const token = jwt.sign(payload, jwtSecret, {
        expiresIn,
    });

    return token;
};

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not received" });
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(
            token,
            process.env.JWT_SECRET as string,
            (err: Error | null, success: any) => {
                if (err) {
                    reject(err.message);
                    return res.status(401).json({ message: "Token Expired" });
                } else {
                    resolve();
                    res.locals.jwtData = success;
                    return next();
                }
            }
        );
    });
};
