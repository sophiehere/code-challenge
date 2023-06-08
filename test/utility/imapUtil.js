const Imap = require('imap');

async function fetchVerificationCodeFromOutlook(username, password) {
    return new Promise((resolve, reject) => {
        const imap = new Imap({
            user: username,
            password: password,
            host: 'outlook.office365.com',
            port: 993,
            tls: true
        });

        imap.once('ready', () => {
            imap.openBox('INBOX', false, (err, box) => {
                if (err) {
                    reject(err);
                    return;
                }

                const searchCriteria = ['UNSEEN', ['HEADER', 'SUBJECT', 'LibreView Verification Code']];
                const fetchOptions = {
                    bodies: [''],
                    markSeen: true
                };

                imap.search(searchCriteria, (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const latestEmailIndex = results[results.length - 1];
                    if (!latestEmailIndex) {
                        reject(new Error('No verification code email found.'));
                        return;
                    }

                    const fetch = imap.fetch(latestEmailIndex, fetchOptions);
                    fetch.on('message', (msg) => {
                        let emailBody = '';

                        msg.on('body', (stream) => {
                            stream.on('data', (chunk) => {
                                emailBody += chunk.toString();
                            });
                        });

                        msg.on('end', () => {
                            const verificationCodeRegex = /Your security code is:\s+(\d+)/i;
                            const verificationCodeMatch = emailBody.match(verificationCodeRegex);

                            if (verificationCodeMatch && verificationCodeMatch[1]) {
                                const verificationCode = verificationCodeMatch[1];
                                resolve(verificationCode);
                            } else {
                                reject(new Error('Verification code not found in the email body.'));
                            }
                        });
                    });

                    fetch.once('error', (err) => {
                        reject(err);
                    });

                    fetch.once('end', () => {
                        imap.end();
                    });
                });
            });
        });

        imap.once('error', (err) => {
            reject(err);
        });

        imap.once('end', () => {
            resolve(null);
        });

        imap.connect();
    });
}

module.exports = { fetchVerificationCodeFromOutlook };