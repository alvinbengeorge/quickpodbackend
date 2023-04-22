import { Router } from "express";

const router = Router();

router.get("/getpicture/:id", async function avatar(req, res) {
    try {
        await res.sendFile(`./assets/${req.params.id}.jpg`);
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

export default router;