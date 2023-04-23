import { Router } from "express";

const router = Router();

router.get("/getpicture/:file", async function avatar(req, res) {
    try {
        const d = process.cwd();
        await res.sendFile(`${d}/assets/${req.params.file}.jpg`);
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

export default router;