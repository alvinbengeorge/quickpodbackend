import { Router } from "express";
import { allEpisodes, getEpisode } from "../utilities/database.js";

const router = Router();

router.get("/getepisode/:id", async function (req, res) {
    try {
        const { id } = req.params;
        let result = {}
        if (id === 'all') {
            result = await allEpisodes();
        } else {
            result = await getEpisode(id);
        }
        await res.send({ "status": true, "data": result });
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

export default router;