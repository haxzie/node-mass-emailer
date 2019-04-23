# Node Mass Emailer
A simpli CLI tool built with NodeMailer to send bulk emails by extracting emails from any given text/csv file.  
currently, confugured only for Gmail.  
Makse sure to enable "Allow login from less secure apps" from your [gmail settings](https://support.google.com/accounts/answer/6010255?hl=en).

## Installation
Install the CLI tool globally using NPM
```
npm i -g mass-emailer
```
## Usage
Mass Emailer take two parameters, 1) The path to the CSV/Text file containing emails, 2) Path to the HTML file of the email.
```
mass-emailer hello.csv example.html
prompt: email: <Enter the email through which you want to send>
prompt: password: <Enter the password of the above email>
prompt: subject: <Enter the subject of the email>
```
## Contributing
Send PRs, lol :smile:

