require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

async function mainMail(companyName, email, message) {
    // Create reusable transporter object using the default SMTP transport
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        }
    });

    const mailOption = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `Contacted from ${companyName}`,
        html: `
        Email from: ${email}
        Message: ${message}`,
    };
    
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            res.json({ success: false, message:"Could not send message." });
        } else {
            res.json({ success: true, message:"Message Sent." });
        }
    });
}

router.post("/send", async (req, res, next) => {
    const companyName = req.body.companyName;
    const email = req.body.email; 
    const message = req.body.message;
    try {
        mainMail(companyName, email, message);
        res.json({ success: true, message:"Email Sent." });
    } catch (err) {
        res.json({ success: false, message:"Error Sending Email: " + err }); 
    }
});

module.exports = router;