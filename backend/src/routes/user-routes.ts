import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
    getAllUsers,
    userSignup,
    userLogin,
    userVerigfy,
} from "../controllers/user-controllers.js";
import {
    signupValidator,
    validate,
    loginValidator,
} from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, userVerigfy);

export default userRoutes;
