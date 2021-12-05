const https = require('https')
const app = require("./app");
const path = require('path')

const fs = require('fs')

const sslSrvr = {
  key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

const server = https.createServer(sslSrvr,app)

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});