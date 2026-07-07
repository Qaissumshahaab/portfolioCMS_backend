import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendemailtoportfolioOwner = async (
  sendername,
  senderemail,
  senderwhatsappNo,
  subjectbysender,
  descriptionbysender,
  portfolioownerEmail,
) => {
  try {
    const infoofemailsendtoowner = await transporter.sendMail({
      from: `"portfolioCMS support" <${process.env.SMTP_USER}>`,
      to: portfolioownerEmail,
      subject: subjectbysender,
      html: `
  <p>
    Sender name: ${sendername}<br>
    Sender email: ${senderemail}<br>
    WhatsApp: ${senderwhatsappNo}<br>
    Description: ${descriptionbysender}
  </p>
`,
    });

    console.log("Email sent:", infoofemailsendtoowner.messageId);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const returnconfirmationEmail = async (
  sendername,
  senderemail,
  portfolioownerusername,
) => {
  try {
    const infoofconfirmationemailreturntoclient = await transporter.sendMail({
      from: `${portfolioownerusername} <${process.env.SMTP_USER}>`,
      to: senderemail,
      subject: `Confirmation that you successfully contacted ${portfolioownerusername}`,
      html: `
  <p>
    Hey ${sendername},<br><br>

    Thanks for reaching out to ${portfolioownerusername}.
    Your message has been received and they will get back to you within 24 hours.
  </p>
`,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
