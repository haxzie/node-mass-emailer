const fs =  require('fs');
const path = require('path');
const emailExtractor = require('../lib/email_extractor');

const emailFile = fs.readFileSync(path.join(__dirname, 'example.csv')).toString();

test('Retreived all emails and removed duplicates', () => {
    const emails = emailExtractor(emailFile);
    expect(emails.size).toBe(138);
});