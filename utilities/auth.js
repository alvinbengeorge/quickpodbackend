import { authenticate } from "./database";

export async function authenticateUser (req, res) {
    const user = req.body;
    const result = await authenticate(user);
    if (!result) {
        throw new Error("Username or password is incorrect");
    }
}