import express from "express";
import video from "./routes/video.js";
import user from "./routes/user.js";

const app = express();
app.use(express.json())
app.use(video);
app.use(user);

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Listening on port 3000");
});