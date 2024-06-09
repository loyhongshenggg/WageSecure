
//we use html-pdf for pdf
const pdfkit = require('pdfkit');
const path = require('path')
const nodemailer = require('nodemailer')
const fs = require('fs')
const User = require('../db/models/user');
require("dotenv").config();


exports.createPdf = async (data, pdfNames) => {
    const pdfPromises = data.map(async (item, index) => {
        const pdfName = pdfNames[index];

        const doc = new pdfkit();

        const folderPath = path.join(__dirname, 'temp_pdf');
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const fullPath = path.join(folderPath, `${pdfName}.pdf`);

        const stream = fs.createWriteStream(fullPath);
        doc.pipe(stream);

        doc.fontSize(12);

        doc.text(`Transaction ID: ${item.id}`, { width: 410, align: 'left' });
        doc.moveDown(); 

        const result = item.result;
        Object.keys(result).forEach((key) => {
            doc.text(`${key}: ${result[key]}`, { width: 410, align: 'left' });
            doc.moveDown(); 
        });

        doc.end();

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                resolve(`PDF ${pdfName} created successfully`);
            });

            stream.on('error', (error) => {
                reject(error);
            });
        });
    });

    return Promise.all(pdfPromises);
};






exports.sendPdf = async (fileNames) => {

    for (const fileName of fileNames) {
        try {

            const user = await User.findOne({ where: { id: fileName } });

            if (user && user.email) {
                // Read the PDF file as base64
                const pathToAttachment = path.join(__dirname, 'temp_pdf', `${fileName}.pdf`);
                const attachment = fs.readFileSync(pathToAttachment).toString("base64");

                // Create SMTP transport
                const smtpTransport = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    },
                    tls: { rejectUnauthorized: false }
                });

                // Send email with attached PDF
                await smtpTransport.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Pdf Generate document',
                    html: 'Payslip for month YYYY-MM-DD',
                    attachments: [{
                        content: attachment,
                        filename: `${fileName}.pdf`,
                        contentType: 'application/pdf'
                    }]
                });
                console.log(`Email sent to ${user.email}`);
            } else {
                console.log(`No email found for user with ID: ${fileName}`);
            }
        } catch (error) {
            console.error(`Error sending email for user with ID ${fileName}: ${error}`);
        }
    }
};

