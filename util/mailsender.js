import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "mail.inchqan.com", // Replace with your SMTP server host
      port: 465, // Replace with your SMTP server port
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'scraperapp@inchqan.com', // Replace with your SMTP server user
        pass: 'digidog2023' // Replace with your SMTP server password
      },
    });
  }

  async sendEmail(to, subject, text) {
    const info = await this.transporter.sendMail({
      from: '"Scraper App" <scraperapp@inchqan.com>', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      // html: "<b>Your daily script run was successful.</b>", // html body (optional)
    });

    console.log("Message sent: %s", info.messageId);
  }
}

export default EmailService;
