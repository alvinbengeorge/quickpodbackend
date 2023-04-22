import { Router } from "express";
import { authenticateUser } from "../utilities/auth.js"
import { createUser, createPodcast } from "../utilities/database.js";
import { validateLogin, validateRegister } from "../utilities/schemas.js";
import { nanoid } from "nanoid";
import { validateAddPodcast } from "../utilities/schemas.js";

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
        let fileName = 'default';
        const user = req.body
        if (req.files && Object.keys(req.files).length !== 0) {
            const avatar = req.files.avatar;       
            fileName = nanoid(10);     
            const path = `./assets/${fileName}.jpg`;
            avatar.mv(path, function(err) {
                if (err) console.log(err);
                else {
                    user['avatar'] = fileName;
                }
            })
        }
        user = await createUser(user, fileName);
        await res.send({ "status": true, "data": user })
    } catch (err) {
        res.status(403).send({"status": false, "error": err.message});
    }
});

router.post("/addpodcast", async function addPodcast(req, res) {
    try {
        let user = await authenticateUser(req, res);
        if (!user.creator) {
            throw new Error("You are not a creator");
        }
        await validateAddPodcast(req);
        const data = req.body;
        const result = await createPodcast(data);
        await res.send({ "status": true, "data": result});        
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }        
});

export default router;
