const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

module.exports = function (csv) {
    let m, emails = [];

    while (m =  regex.exec(csv)) {
        emails.push(m[0]);
    }
    return emails;
}