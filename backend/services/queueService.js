const Queue = require("bull");
const { sendEmail } = require("./mailService");
const database = require("../db/db");
const emailQueue = new Queue("email");

const producer = async (emailData) => {
  for (let recipient of emailData.recipient) {
    await emailQueue.add({
      recipient,
      subject: emailData.subject,
      text: emailData.text,
    });
  }
};
(consumer = async () => {
  await emailQueue.process(async (job) => {
    const { recipient, subject, text } = job.data;
    sendEmail(recipient, subject, text);
  });
})();

(mailStatus = () => {
  emailQueue.on("completed", async (job) => {
    const { recipient, subject, text } = job.data;
    console.log(`Job completed for ${recipient}`);
    await database.execute(
        "UPDATE mailStatus SET status = ? WHERE recipient_mail_id = ? AND recipient_mail_subject = ? AND recipient_mail_text = ?",
        ["success", recipient, subject, text]
      );
    return true;
  });
  emailQueue.on("failed", async (job, err) => {
    const { recipient, subject, text } = job.data;
    console.error(`Job failed for ${recipient}: ${err}`);
    await database.execute(
        "UPDATE mailStatus SET status = ? WHERE recipient_mail_id = ? AND recipient_mail_subject = ? AND recipient_mail_text = ?",
        ["failed", recipient, subject, text]
      );    
    return false;
  });
})();



module.exports = { producer };
