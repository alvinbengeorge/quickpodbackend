import { Router } from "express";
import { authenticateUser } from "../utilities/auth.js"
import { createUser } from "../utilities/database.js";
import { validateLogin, validateRegister } from "../utilities/schemas.js";
import { nanoid } from "nanoid";

const router = Router();

router.post("/login", async function (req, res) {
    try {
        await validateLogin(req);
        await authenticateUser(req, res);
        await res.send({ "status": true });
    } catch (err) {
        res.status(403).send({"status": false, "error": err.message});
    }
});

router.post("/register", async function (req, res) {
    try {
        await validateRegister(req);
        const user = req.body
        if (req.files && Object.keys(req.files).length !== 0) {
            const avatar = req.files.avatar;
            const fileName = nanoid();
            const path = `./assets/${fileName}.jpg`;
            avatar.mv(path, function(err) {
                if (err) console.log(err);
                else {
                    user['avatar'] = fileName;
                }
            })
        }
        await createUser(user);
        await res.send({ "status": true})
    } catch (err) {
        res.status(403).send({"status": false, "error": err.message});
    }
});

export default router;
