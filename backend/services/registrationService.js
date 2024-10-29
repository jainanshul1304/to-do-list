const db = require('../db/db');

async function createUser(credentials) {
    try {
        const [existingUser] = await db.execute(
            "SELECT * FROM UserList WHERE email = ?",
            [credentials.email]
        );

        if (existingUser.length > 0) {
            throw new Error("User already exists");
        }

        await db.execute(
            "INSERT INTO UserList (email, password) VALUES (?, ?)",
            [credentials.email, credentials.hashPassword]
        );

    } catch (error) {
        console.error("Database query failed:", error.message);
        throw error;
    }
}

module.exports = { createUser };
