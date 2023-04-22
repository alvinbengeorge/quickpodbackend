import { authenticate } from "./database.js";

export async function authenticateUser (req, res) {
    const user = req.body;
    const result = await authenticate(user);
    if (!result) {
        throw new Error("Username or password is incorrect");
    } else {
        return result;
    }
}