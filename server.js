const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // API Endpoints
    if (req.url === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'online', system: 'PRD_System', time: new Date() }));
    }

    if (req.url === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'authenticated', role: 'admin', token_sha256: 'a3f9e81b2c4d5e6f7a8b9c0d1e2f3a4b' }));
        });
        return;
    }

    if (req.url === '/api/trading/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            bot_status: 'ACTIVE',
            rules: 'FTMO Challenge ($100,000 USD)',
            daily_loss_percent: '0.85%',
            max_daily_limit: '5.0%',
            total_pnl_usd: '+$1,450.00',
            audit_hash: 'a3f9e81b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f'
        }));
    }

    if (req.url === '/api/economy/summary') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            fed_rate: '4.25% - 4.50%',
            us_cpi_yoy: '2.4%',
            ecb_refi_rate: '3.00%',
            bcra_reserves_usd: '$31,000 M',
            bcra_ipc_monthly: '2.1%',
            gdp_forecast_global: '+3.2%'
        }));
    }

    // Serve static files
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 PRD_SYSTEM PORTAL UNIFICADO EN VIVO`);
    console.log(`🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});
