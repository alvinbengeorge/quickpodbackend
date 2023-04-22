import { Router } from "express";
import { authenticateUser } from "../utilities/auth.js"
import { createUser } from "../utilities/database.js";
import { validateLogin, validateRegister } from "../utilities/schemas.js";

const router = Router();

router.post("/login", async function (req, res) {
    try {
        await validateLogin(req);
        await authenticateUser(req, res);
    } catch (err) {
        res.status(403).send(err.message);
    }
});

router.post("/register", async function (req, res) {
    try {
        await validateRegister(req);
        await createUser(req, res);
    } catch (err) {
        res.status(403).send(err.message);
    }
});

export default router;
