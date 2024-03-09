import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    if (!process.env.MONGODB_URL) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }

    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };
