import { Router } from "express";
import { authenticateUser, createUser } from "../utilities/auth"
import { validateLogin, validateRegister } from "../utilities/schemas";

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
