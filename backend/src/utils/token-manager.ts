import jwt from "jsonwebtoken";

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
