const nodemailer = require("nodemailer");

const senderEmail = "lartemone03@gmail.com";
const senderPassword = "cgilbaysvormnmnj";
const receiverEmail = "re.meral@mail.ru";

const transport = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    auth: {
        user: senderEmail,
        pass: senderPassword,
    },
});

function send(message) {
    const option = {
        from: senderEmail,
        to: receiverEmail,
        subject: "06-03",
        text: message,
    };

    transport.sendMail(option, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports = { send };
