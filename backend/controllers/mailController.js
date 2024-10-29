const database = require("../db/db");
const { producer } = require("../services/queueService");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const validator = require("validator");
const sendEmailHandler = async (req, res) => {
  try {
    const emailData = req.body;
    emailData.recipient = emailData.recipient.filter((recipient) =>
      validator.isEmail(recipient)
    );

    if (emailData.recipient.length === 0) {
      return res.status(400).json({ message: "Invalid recipient emails" });
    }
    for (let recipient of emailData.recipient) {
      await database.execute(
        "INSERT INTO mailStatus (recipient_mail_id, recipient_mail_subject, recipient_mail_text, status) VALUES (?, ?, ?, ?)",
        [recipient, emailData.subject, emailData.text, "initialised"]
      );
    }
    await delay(5000);
    await producer({...emailData});

    console.log("Insert query executed and emails queued!");
    res.status(200).json({ message: "Emails are being sent." });
  } catch (err) {
    console.error("Caught error in handler:", err.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = { sendEmailHandler };
