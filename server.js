const http = require('http');
const httpProxy = require('http-proxy');

// Configuration de la cible vers le port 443 de votre VPS
const TARGET_VPS = 'http://51.178.36.129:443'; 

const proxy = httpProxy.createProxyServer({});

// Empêche le serveur de crasher en cas d'erreur de connexion avec le VPS
proxy.on('error', (err, req, res) => {
  if (!res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain' });
  }
  res.end('Relay error');
});

const server = http.createServer((req, res) => {
  // Transmet la requête au VPS sur le port 443
  proxy.web(req, res, { target: TARGET_VPS });
});

// IMPORTANT : Les hébergeurs imposent leur propre port en interne.
// On écoute le port fourni par l'hébergeur, mais le script redirige bien vers le 443 du VPS au-dessus.
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Serveur relais actif`);
});
