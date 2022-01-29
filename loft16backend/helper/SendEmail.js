
const nodeEmailer = require('nodemailer');

const fs = require('fs');

const getFileContent = (template_content) => {
    let contents = fs.readFileSync(`assets/mails/${template_content.template_name}`, 'utf-8');
    return contents;
}

const transTemplate = (template_content) => {
    var template = require('es6-template-strings');
    return template(getFileContent(template_content), {...template_content})
}

// template_content  { email_address, user_name, template_name, subject}
const sendEmail = (userEmail, template_content) => {
    const { email_address, subject, template_name } = template_content

    let smtpTransport = nodeEmailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: process.env.MASTEREMAIL,
            pass: process.env.MASTERPASS
        }
    });

    let mailOptions = {
        from: process.env.MASTEREMAIL,
        to: email_address,
        subject,
        html: transTemplate(template_content)
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) console.log("error",error);
        else console.log('Sucess');
    });

    smtpTransport.close();
}

module.exports = sendEmail