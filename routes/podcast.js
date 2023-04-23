import { Router } from "express";
import { sPodcast, getAllPodcast, getPodcast, getCreatorPostcasts} from "../utilities/database.js";

const router = Router();

router.get("/search", async function (req, res) {
    try {
        const { q } = req.query;
        const result = await sPodcast(q);
        await res.send({ "status": true, "data": result });
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

router.get("/podcast/:id", async function (req, res) {
    try {
        const { id } = req.params;
        let result = {};
        if (id === 'all') {
            result = await getAllPodcast();
        } else {
            result = await getPodcast(id);
        }
        await res.send({ "status": true, "data": result });
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

router.get("/creatorpodcast/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const result = await getCreatorPostcasts(id);
        await res.send({ "status": true, "data": result });
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
})

export default router;
