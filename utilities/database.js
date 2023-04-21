import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
export const users = client.db("quickpod").collection("users");

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

