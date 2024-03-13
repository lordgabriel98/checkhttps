const tls = require('tls');
const websitesData = require('./govWeb.json');


const checkSSL = async(hostname) =>{
	return new Promise((resolve, reject)=>{
		const options = {

			host: hostname,
			port: 443,
			rejectUnauthorized: false,
		};

		const socket = tls.connect(options, () =>{
			
			const isSSL = socket instanceof tls.TLSSocket;

			socket.end();

			resolve(isSSL);
		});

		socket.on('error', (error)=>{
			reject(error);
		});

	});


};


const checkWebsites = async ()=>{ 
 const websites = Object.values(websitesData);

for (let website of websites){
	
	try{
		const isSSL = await checkSSL(website);
		console.log(`${website} is using SSL: ${isSSL}`);
	
	}catch(error){
		console.error(`Error checking SSL for ${website}`);
			}
									
	}	
}


checkWebsites();
