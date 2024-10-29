const db = require("../db/db");
const bcrypt = require("bcryptjs");
const users = require("../models/userListModel");
const loginAuthenticator = async (credentials) => {
  try {
    const results = await users.findOne({
      where: {
        email: credentials.email,
      },
    });
    console.log(`Query Result:`, results);

    if (results == null) {
      console.log("Invalid credentials: No user found");
      return { success: false, results };
    }

    const hashedPassword = results.password;
    // console.log(hashedPassword);
    const match = await bcrypt.compare(credentials.password, hashedPassword);
    console.log(`Password Match:`, match);
    if (!match) {
      console.log("Invalid credentials: Incorrect password");
      return { success: false, results };
    }
    return { success: true, results };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { loginAuthenticator };
