import express from "express";
import video from "./routes/video.js";
import user from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json())
app.use(video);
app.use(user);

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});