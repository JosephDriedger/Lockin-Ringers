
const nodemailer = require('nodemailer');

const DEFAULT_RECIPIENT = 'lockinringers@gmail.com';

let transporter;

// Lazily creates the SMTP transporter so the server can start without mail credentials
function getTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: (Number(process.env.SMTP_PORT) || 465) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    return transporter;
}

class Mailer {
    static isConfigured() {
        return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
    }

    // Sends a booking request to the quartet's inbox; replies go straight to the requester
    static async sendBookingRequest({ name, email, date, location, message }) {
        const to = process.env.CONTACT_TO || DEFAULT_RECIPIENT;

        await getTransporter().sendMail({
            from: `"Lock-in' Ringers Website" <${process.env.SMTP_USER}>`,
            to,
            replyTo: `"${name.replace(/["\r\n]/g, '')}" <${email}>`,
            subject: `Booking request from ${name.replace(/[\r\n]/g, ' ')}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Performance Date(s): ${date || 'Not provided'}`,
                `Performance Location: ${location || 'Not provided'}`,
                '',
                'Message / Details:',
                message
            ].join('\n')
        });
    }
}

module.exports = Mailer;
