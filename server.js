const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Name: ${name}, Email: ${email}, Message: ${message}');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'musaleenh@gmail.com',
            pass: 'Musaleen123'

        }
    });
    const mailOptions = {
        from: email,
        to: 'musaleenh@gmail.com',
        subject: 'New contact form submission',
        text: 'Name ${name}\nEmail: ${email}\nMessage: ${message}'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            return res.status(500).send('Error sending email');

        }
        console.log('Email Sent: ' + info.response);
        res.send('Thank you for your message!');

    });
});
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});