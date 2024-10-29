const db = require('../db/db');
const users = require("../models/userListModel");

async function createUser(credentials) {
    try {
        const existingUser = await users.findAll({
            where: {
                email : credentials.email
            }
        })
        console.log(existingUser);
        if (existingUser != null) {
            console.log("User already exists");
            return;
        }

        await users.create({
            email : credentials.email,
            password : credentials.hashPassword
        })

    } catch (error) {
        console.error("Database query failed:", error.message);
        throw error;
    }
}

module.exports = { createUser };
