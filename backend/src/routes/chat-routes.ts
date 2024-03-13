import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
    generateChatCompletion,
    sendChatsToUser,
    deleteChats,
} from "../controllers/chat-controllers.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";

//protected API
const chatRoutes = Router();
chatRoutes.post(
    "/new",
    validate(chatCompletionValidator),
    verifyToken,
    generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
