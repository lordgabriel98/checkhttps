const https = require('https');
const websitesData = require('./govweb.json');


//Function to check if the website has a valid SSL certificate
const checkSSLValidity = (domain, timeout) => {
	const url = `https://${domain}`;

	return new Promise((resolve, reject)=>{
		const options = {
			timeout:timeout
		};
	

  https.get(url, options, (res) => {
       const certificate = res.socket.getPeerCertificate();

           // Check if the certificate object is not empty and valid
               if (certificate && Object.keys(certificate).length) {
                   const validTo = new Date(certificate.valid_to);
                   const isValid = validTo > new Date(); // Check if the certificate is currently valid

                  resolve(isValid);
                         
                 
            
	      } else {
               	         resolve(false);
                      }

  			}).on('error', (e) => {
                        
			reject(e);
                        });
			});
                    };


// checkSSLValidity('www.rpngc.gov.pg', 5000);


const checkWebsites = async ()=>{
	const websites = Object.values(websitesData);
	const timeout = 10000;

	for (let website of websites){

		        try{
		                const isSSL = await checkSSLValidity(website);
		                console.log(`${website} is using SSL: ${isSSL}`);

		        }catch(error){
		                console.error(`Error checking SSL for ${website}`);
						                        }

		        }
}

checkWebsites();


