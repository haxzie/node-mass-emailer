#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const package = require('./package.json');
const extractEmails = require('./lib/email_extractor');
const emailer = require('./lib/email_sender');
const prompt = require('prompt');


// check if the argument is provided for help description
if (process.argv[2] === 'help') {
    console.log(`mass-emailer ${package.version}`);
    console.log('USAGE: mass-emailer PATH_TO_CSV EMAIL_TEMPLATE SUBJECT');
    process.exit(0);
}

// check if there are enough arguments provided
if (process.argv.length != 4) {
    console.error('Not enough arguments. type \"mass-emailer help" to know how to use the tool');
    process.exit(0);
}

// check if the provided csv file exists
const csvPath = path.join(process.cwd(), process.argv[2]);
if (!fs.existsSync(csvPath)) {
    console.error("Unable to find the specified CSV file.");
    process.exit(0);
}
// check if the provided html template exists
const templatePath = path.join(process.cwd(), process.argv[3]);
if (!fs.existsSync(templatePath)) {
    console.error("Unable to find the specified template file.");
    process.exit(0);
}

// read the csv file and extract the email addresses
const csv = fs.readFileSync(csvPath);
const emails = extractEmails(csv.toString());
if (emails.length == 0) {
    console.error('No emails found in the provided csv');
    process.exit(0);
}

// read the template file
const template = fs.readFileSync(templatePath).toString();

prompt.start();

const inputSchema = {
    properties:  {
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
            message: "Enter a valid email address"
        },
        password: {
            hidden: true,
            required: true,
        },
        subject: {
            required: true
        }
    }
}
prompt.get(inputSchema, (err, result) => {
    if (err) {
        return;
    }

    // create a transporter from email and password
    const transporter = emailer.getTransporter(result.email, result.password);

    console.log(`Sending emails to ${emails.length} mail ID's`);
    emails.forEach(async (email) => {
        await emailer.sendMail(transporter, email, result.subject , template);
    });

});
