import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import axios from "axios";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { prompt_message } = req.body;

    try {
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

        //grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        })) as ChatCompletionRequestMessage[];
        chats.push({ role: "user", content: prompt_message });
        user.chats.push({ role: "user", content: prompt_message });

        //send all chats with new one to openAI API
        const config = configureOpenAI();

        const openai = new OpenAIApi(config);

        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });

        user.chats.push(chatResponse.data.choices[0].message as any);

        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        //console.log(error);
        if (axios.isAxiosError(error)) {
            // Check if the error response exists and is from a rate limit issue
            if (error.response && error.response.status === 429) {
                console.error("Rate limit reached:", error.response.data);
                console.error(
                    "Rate limit resets at:",
                    error.response.headers["ratelimit-reset"]
                );
            } else {
                // Other axios error
                console.error("Request failed:", error.message);
            }
        } else {
            // Non-axios error
            console.error("An unexpected error occurred:", error);
        }
        return res.status(500).json({
            message: "Something went wrong while generating chat completion",
            cause: (error as Error).message,
        });
    }
};
