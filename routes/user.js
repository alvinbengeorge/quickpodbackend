import { Router } from "express";
import { authenticateUser } from "../utilities/auth.js"
import { createUser, createPodcast, addEpisodes } from "../utilities/database.js";
import { validateLogin, validateRegister } from "../utilities/schemas.js";
import { nanoid } from "nanoid";
import { validateAddPodcast } from "../utilities/schemas.js";

const router = Router();

router.post("/login", async function (req, res) {
    try {
        await validateLogin(req);
        const result = await authenticateUser(req, res);
        await res.send({ "status": true, "data": result });
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
        const { title, description, creator } = req.body;
        const result = await createPodcast({title, description, creator});
        await res.send({ "status": true, "data": result });        
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }        
});

router.post("/addepisode", async function addEpisodes(req, res) {
    try {
        let user = await authenticateUser(req, res);
        if (!user.creator) {
            throw new Error("You are not a creator");
        }
        const { title, description, parent } = req.body;
        const data = { title, description, parent};
        if (req.files && Object.keys(req.files).length !== 0) {
            const episode = req.files.episode;       
            const fileName = nanoid(10);     
            const path = `./videos/${fileName}.mp4`;
            episode.mv(path, function(err) {
                if (err) console.log(err);
                else {
                    data['episode'] = fileName;
                }
            })       
            data['time'] = Math.round((new Date())/1000);
            data['views'] = 0;
            const result = await addEpisodes(data);
            await res.send({ "status": true, "data": result}); 
        }
               
    } catch (err) {
        await res.send({ "status": false, "message": err.message });
    }
});

export default router;
