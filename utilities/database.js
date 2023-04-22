import { MongoClient } from 'mongodb';
import dotenv from "dotenv";


dotenv.config()

const client = new MongoClient(process.env.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
export const users = client.db("quickpod").collection("users");
export const podcasts = client.db("quickpod").collection("podcasts");

export async function connect() {
    await client.connect();
    console.log("Connected to MongoDB");
}

export async function createUser(user) {
    const exists = await users.findOne({ username: user.username });
    if (exists) {
        throw new Error("User already exists");
    }
    const result = await users.insertOne(user);
    return result;
}

export async function authenticate(user) {
    const result = await users.findOne({ username: user.username, password: user.password });
    return result;
}

/*
PODCAST SCHEMA
{
    _id: ObjectId,
    title: String,
    description: String,
    coverPhoto: String,
    creator: String,
    podcastCreated: Date,
    listeners: [String],
    episodes: [
        {
            _id: ObjectId,
            title: String,
            description: String,
            duration: Number,
            coverPhoto: String
            date: Date,
            views: Number,
            parent: String
        }
    ]
}
*/

export async function createPodcast(podcast) {
    podcast.episodes = JSON.stringify(podcast.episodes)
    podcast.listeners = JSON.stringify(podcast.listeners)
    const result = await podcasts.insertOne(podcast);
    return result;
}

export async function searchPodcast(name) {
    const result = await podcasts.find({ title: { $regex: name, $options: "i" } }).toArray();
    return result
}

export async function getPodcast(id) {
    const result = await podcasts.findOne({ _id: id });
    return result;    
}

export async function addEpisodes(episode, id) {
    const result = await podcasts.findOne({ _id: id });
    result.episodes = JSON.parse(result.episodes);
    result.episodes.push(episode);
    result.episodes = JSON.stringify(result.episodes);
    return await podcasts.updateOne({ _id: id }, { $set: { episodes: result.episodes } });
}



