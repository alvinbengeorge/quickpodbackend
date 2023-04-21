import { Router } from "express";
import { authenticateUser } from "../utilities/auth"

const router = Router();

router.post("/login", async function (req, res) {
    try {
        await authenticateUser(req, res);
    } catch (err) {
        res.status(403).send(err.message);
    }
});
router.post("/register", async function (req, res) {
    try {
        await createUser(req, res);
    } catch (err) {
        res.status(403).send(err.message);
    }
});

export default router;
