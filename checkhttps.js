 const https = require('https');

//Function to check if the website has a valid SSL certificate
const checkSSLValidity = (url) => {
  https.get(url, (res) => {
       const certificate = res.socket.getPeerCertificate();

           // Check if the certificate object is not empty and valid
               if (certificate && Object.keys(certificate).length) {
                     const validTo = new Date(certificate.valid_to);
                           const isValid = validTo > new Date(); // Check if the certificate is currently valid

                                 if (isValid) {
                                         console.log(`${url} has a valid SSL certificate.`);
                                               } else {
                                                       console.log(`${url}'s SSL certificate is expired.`);
                                                             }
                                                                 } else {
                                                                       console.log(`${url} does not use SSL/TLS or the certificate could not be verified.`);
                                                                           }
                                                                             }).on('error', (e) => {
                                                                                 console.error(`Error checking SSL certificate for ${url}: `, e);
                                                                                   });
                                                                                   };

          // Replace 'https://example.com' with the URL of the website you want to check
checkSSLValidity('www.pngec.gov.pg');

