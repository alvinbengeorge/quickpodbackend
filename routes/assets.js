import { Router } from "express";

const router = Router();

router.get("/getpicture/:file", async function avatar(req, res) {
    try {
        await res.sendFile(`./assets/${req.params.file}.jpg`);
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

export default router;