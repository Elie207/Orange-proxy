const http = require('http');
const httpProxy = require('http-proxy');

// Le script redirige maintenant vers le port 443 de votre VPS
const TARGET_VPS = 'http://51.178.36.129:443'; 

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: TARGET_VPS }, (e) => {
    res.writeHead(500);
    res.end();
  });
});

server.listen(process.env.PORT || 8080);
