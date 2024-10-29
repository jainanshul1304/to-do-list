const Queue = require("bull");
const { sendEmail } = require("./mailService");
const MailStatus = require("../models/mailStatusModel");
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

(async () => {
  await emailQueue.process(async (job) => {
    const { recipient, subject, text } = job.data;
    await sendEmail(recipient, subject, text);
  });
})();

(() => {
  emailQueue.on("completed", async (job) => {
    const { recipient, subject, text } = job.data;
    console.log(`Job completed for ${recipient}`);
      await MailStatus.update(
        { recipient_mail_status: "success" },
        {
          where: {
            recipient_mail_id: recipient,
            recipient_mail_subject: subject,
            recipient_mail_text: text,
          },
        }
      );
      console.log(`Mail status updated to 'success' for ${recipient}`);
    return true;
  });

  emailQueue.on("failed", async (job, err) => {
    const { recipient, subject, text } = job.data;
    console.error(`Job failed for ${recipient}: ${err.message}`);
      await MailStatus.update(
        { recipient_mail_status: "failed" },
        {
          where: {
            recipient_mail_id: recipient,
            recipient_mail_subject: subject,
            recipient_mail_text: text,
          },
        }
      );
      console.log(`Mail status updated to 'failed' for ${recipient}`);
    return false;
  });
})();

module.exports = { producer };
