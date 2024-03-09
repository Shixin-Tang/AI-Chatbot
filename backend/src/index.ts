import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// app.get("/", (req, res, next) => {
//     return res.send("Hello AI ChatBot!");
// });

// app.get("/hello", (req, res, next) => {
//     return res.send("Hello AI ChatBot!");
// });

// app.post("/hello", (req, res, next) => {
//     //console.log(req.body.name);
//     return res.send("POST: Hello, " + req.body.name + "!");
// });

// app.put("/hello", (req, res, next) => {
//     //console.log(req.body.name);
//     return res.send("PUT: Hello, " + req.body.name + "!");
// });

// app.delete("/hello", (req, res, next) => {
//     //console.log(req.body.name);
//     return res.send("DELETE: Hello, " + req.body.name + "!");
// });

// app.delete("/user/:id", (req, res, next) => {
//     console.log(req.params.id);
//     return res.send("DELETE: Hello, " + req.params.id + "!");
// });

//connections and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
        app.listen(PORT, () =>
            console.log(
                "AI ChatBot Server started and connected to MongoDB. Listening on port 5000"
            )
        );
    })
    .catch((err) => console.log(err));
