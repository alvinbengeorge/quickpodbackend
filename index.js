import express from "express";
import video from "./routes/video.js";
import user from "./routes/user.js";
import podcast from "./routes/podcast.js";
import assets from "./routes/assets.js"
import episode from "./routes/episode.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { connect } from "./utilities/database.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(fileUpload())
app.use(video);
app.use(user);
app.use(assets);
app.use(podcast)
app.use(episode);
try{
    connect();
} catch (err) {
    console.log(err);
}

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});

export default app;