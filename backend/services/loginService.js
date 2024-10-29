const db = require("../db/db");
const bcrypt = require("bcryptjs");

const loginAuthenticator = async (credentials) => {
  try {
    const query = "SELECT * FROM UserList WHERE email = ?";
    const [results] = await db.execute(query, [credentials.email]);
    console.log(`Query Result:`, results);

    if (results.length === 0) {
      console.log("Invalid credentials: No user found");
      return { success: false, results };
    }

    const hashedPassword = results[0].password;
    const match = await bcrypt.compare(credentials.password, hashedPassword);
    console.log(`Password Match:`, match);
    if (!match) {
      console.log("Invalid credentials: Incorrect password");
      return { success: false,results };
    }
    return { success: true,results };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { loginAuthenticator };
