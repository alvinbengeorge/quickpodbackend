import express from "express";

const app = express();
app.use(express.json())

app.get("/", async (req, res) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log("Listening on port 3000");
});