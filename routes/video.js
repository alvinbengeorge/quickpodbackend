import { Router } from "express";
import fs from "fs";


const router = Router();

const HTML = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Video Streaming With Node</title>
        <style>
            body {
                margin: 5% auto;
                max-width: 100%;
                background-color: rgb(14, 14, 14);
                padding-top: 10%;
                padding-left: 35%;
            }
        </style>
    </head>
    <body>
        <video id="videoPlayer" width="50%" controls muted="muted" autoplay>
            <source src="/video/SoVq3SUMjw0" type="video/mp4" />
        </video>
    </body>
</html>
`;

router.get("/view", async function (req, res) {
    res.send(HTML);
});

router.get("/video/:id", async function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = `./videos/${req.params.id}.mp4`;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});



export default router;