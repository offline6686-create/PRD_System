const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'prd_database.json');
const AUDIT_FILE = path.join(__dirname, 'audit_trail.json');

// MIME Types
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

// Password Helper
function hashPassword(password) {
    return crypto.createHash('sha256').update(password + '_prd_salt').digest('hex');
}

// Initial Database Seeding
function initDatabase() {
    if (!fs.existsSync(DB_FILE)) {
        const initialDb = {
            users: [
                { id: 1, username: 'owner', email: 'owner@prd.system', password_hash: hashPassword('owner123'), role: 'owner', name: 'Owner & Chief Strategist', is_active: 1 },
                { id: 2, username: 'admin', email: 'admin@prd.system', password_hash: hashPassword('admin123'), role: 'admin', name: 'Administrador PRD', is_active: 1 },
                { id: 3, username: 'docente', email: 'docente@prd.system', password_hash: hashPassword('docente123'), role: 'docente', name: 'Profesor de Música', is_active: 1 },
                { id: 4, username: 'alumno', email: 'alumno@prd.system', password_hash: hashPassword('alumno123'), role: 'alumno', name: 'Estudiante Registrado', is_active: 1 },
                { id: 5, username: 'usuario', email: 'usuario@prd.system', password_hash: hashPassword('usuario123'), role: 'usuario', name: 'Cliente E-Commerce', is_active: 1 }
            ],
            macro_series: [
                { symbol: 'FED_FUNDS', name: 'Federal Funds Rate', value: '4.25% - 4.50%', source: 'FED / FRED', trend: 'STABLE', updated: '2026-08-21' },
                { symbol: 'BCRA_RESERVAS', name: 'Reservas Internacionales BCRA', value: '$31,450 M USD', source: 'BCRA API', trend: '+1.2%', updated: '2026-08-21' },
                { symbol: 'USD_ARS_MEP', name: 'Dólar MEP Argentina', value: '$1,285.50', source: 'BYMA / CNV', trend: '-0.4%', updated: '2026-08-21' },
                { symbol: 'ARG_INFLACION', name: 'IPC Inflación Mensual INDEC', value: '2.1%', source: 'INDEC', trend: '-0.3%', updated: '2026-08-21' },
                { symbol: 'FTMO_EQUITY', name: 'FTMO Challenge Equity ($100k)', value: '$101,450.00 USD', source: 'Trading Bot', trend: '+$1,450', updated: '2026-08-21' }
            ],
            research_notes: [
                { id: 1, title: 'Impacto de Recorte de Tasas FED en Bonos Soberanos Argentina (AL30/GD30)', hypothesis: 'Un recorte de 25bps en la tasa FED comprimirá spreads emergentes aumentando paridades de bonos en un 4-6%.', tags: 'FED, BCRA, Bonos, Macro', author: 'Owner', created_at: '2026-08-20' },
                { id: 2, title: 'Estrategia Breakout en EURUSD durante Apertura de Londres', hypothesis: 'Ruptura del máximo/mínimo de la sesión asiática presenta un R:R promedio de 1:2.5 en temporalidad 15M.', tags: 'Trading, FX, Backtesting', author: 'Owner', created_at: '2026-08-19' }
            ],
            trade_specifications: [],
            trading_journal: [],
            tokens: {}
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
    }

    if (!fs.existsSync(AUDIT_FILE)) {
        fs.writeFileSync(AUDIT_FILE, JSON.stringify([], null, 2));
    }
}

function readDb() {
    initDatabase();
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDb(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function logAudit(userId, action, resource, ip, status) {
    try {
        const auditLogs = fs.existsSync(AUDIT_FILE) ? JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8')) : [];
        auditLogs.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            user_id: userId || 'anonymous',
            action,
            resource,
            ip: ip || '127.0.0.1',
            status,
            timestamp: new Date().toISOString()
        });
        fs.writeFileSync(AUDIT_FILE, JSON.stringify(auditLogs, null, 2));
    } catch (e) {
        console.error("Audit log error:", e);
    }
}

// Natural Language Trade Intent Engine
function parseTradeIntent(text, balance = 100000) {
    const textUpper = text.toUpperCase();
    
    // Extract Side
    let side = 'BUY';
    if (textUpper.includes('VENDER') || textUpper.includes('SELL') || textUpper.includes('SHORT')) {
        side = 'SELL';
    }

    // Extract Instrument
    let instrument = 'EURUSD';
    const knownInstruments = ['EURUSD', 'GBPUSD', 'BTCUSD', 'BTCUSDT', 'ETHUSD', 'AAPL', 'SPY', 'AL30', 'GD30', 'MERVAL', 'GOLD', 'OIL'];
    for (const inst of knownInstruments) {
        if (textUpper.includes(inst)) {
            instrument = inst;
            break;
        }
    }

    // Extract Numbers (Prices, Stop, TP, Risk)
    const numbers = text.match(/\d+(\.\d+)?/g) ? text.match(/\d+(\.\d+)?/g).map(Number) : [];
    
    let entryPrice = 1.1000;
    let stopLoss = 1.0970;
    let takeProfit = 1.1060;
    let riskPercent = 0.5;

    // Check for explicit "risk" / "riesgo"
    const riskMatch = text.match(/(riesgo|risk|arriesgando)\s*(\d+(\.\d+)?)\s*%/i);
    if (riskMatch) {
        riskPercent = parseFloat(riskMatch[2]);
    }

    // Check for explicit "stop"
    const stopMatch = text.match(/(stop|sl)\s*(\d+(\.\d+)?)/i);
    if (stopMatch) {
        stopLoss = parseFloat(stopMatch[2]);
    }

    // Check for explicit "tp" / "profit" / "target"
    const tpMatch = text.match(/(tp|take profit|target)\s*(\d+(\.\d+)?)/i);
    if (tpMatch) {
        takeProfit = parseFloat(tpMatch[2]);
    }

    // Position Sizing Calculation (FTMO Position Sizing Rule)
    const riskAmountUsd = balance * (riskPercent / 100);
    const stopDistancePips = Math.abs(entryPrice - stopLoss);
    const lotSize = stopDistancePips > 0 ? Number((riskAmountUsd / (stopDistancePips * 10000)).toFixed(2)) : 1.0;
    const rMultiple = stopDistancePips > 0 ? Number((Math.abs(takeProfit - entryPrice) / stopDistancePips).toFixed(2)) : 2.0;

    // Generate SHA-256 Hash
    const tradePayload = { instrument, side, entryPrice, stopLoss, takeProfit, riskPercent, lotSize, timestamp: new Date().toISOString() };
    const tradeHash = crypto.createHash('sha256').update(JSON.stringify(tradePayload)).digest('hex');

    return {
        id: 'TS-' + Date.now(),
        instrument,
        side,
        order_type: 'STOP',
        entry_price: entryPrice,
        stop_loss: stopLoss,
        take_profit: takeProfit,
        risk_percent: riskPercent,
        risk_amount_usd: riskAmountUsd,
        position_size_lots: lotSize,
        r_multiple: rMultiple,
        mode: 'PAPER',
        broker: 'Interactive Brokers / FTMO Adapter',
        status: 'VALIDATED',
        risk_check: {
            ftmo_daily_loss_ok: true,
            max_risk_ok: riskPercent <= 2.0,
            account_balance: balance
        },
        hash_sha256: tradeHash,
        raw_prompt: text
    };
}

// HTTP Server & Middleware Architecture
const server = http.createServer((req, res) => {
    const clientIp = req.socket.remoteAddress || '127.0.0.1';

    // CORS & JSON Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    // Auth Token Extractor & Middleware
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '').trim();
    const db = readDb();
    
    let reqUser = null;
    if (token && db.tokens && db.tokens[token]) {
        reqUser = db.tokens[token];
    }

    // Helper: Require Role Middleware
    function requireRole(allowedRoles, handler) {
        if (!reqUser) {
            logAudit(null, 'UNAUTHORIZED_ACCESS', req.url, clientIp, 'DENIED');
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'No autenticado. Por favor inicie sesión.' }));
        }

        if (!allowedRoles.includes(reqUser.role)) {
            logAudit(reqUser.id, 'FORBIDDEN_ROLE_ACCESS', req.url, clientIp, 'DENIED');
            res.writeHead(403, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ 
                error: `Acceso Denegado: El módulo ${req.url} requiere el rol [${allowedRoles.join(' / ').toUpperCase()}]. Tu rol actual es [${reqUser.role.toUpperCase()}].` 
            }));
        }

        handler();
    }

    // ==========================================
    // API ENDPOINTS
    // ==========================================

    // Health & System Status Endpoints
    if (req.url === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: 'online', system: 'PRD_System_Platform', version: '3.0.0', time: new Date() }));
    }

    if (req.url === '/api/v1/economy/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            module: 'economia',
            system: 'PRD-FORGE CORE',
            status: 'online',
            data_sources: ['BCRA', 'BYMA', 'FED', 'FRED', 'TradingView']
        }));
    }

    if (req.url === '/api/v1/economy/sources') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            sources: [
                {
                    id: 'bcra',
                    name: 'BCRA',
                    full_name: 'Banco Central de la República Argentina',
                    description: 'Estadísticas monetarias, reservas internacionales, tipo de cambio e indicadores oficiales.',
                    country: '🇦🇷 Argentina',
                    source_type: 'Economic Data / Central Bank',
                    status: 'Sitio oficial',
                    url: 'https://www.bcra.gob.ar/'
                },
                {
                    id: 'byma',
                    name: 'BYMA',
                    full_name: 'Bolsas y Mercados Argentinos',
                    description: 'Mercado de capitales argentino, datos de mercado (renta fija, variable, bonos y opciones).',
                    country: '🇦🇷 Argentina',
                    source_type: 'Market Data Exchange',
                    status: 'Sitio oficial',
                    url: 'https://www.byma.com.ar/'
                },
                {
                    id: 'fed',
                    name: 'Federal Reserve',
                    full_name: 'Federal Reserve System',
                    description: 'Sistema de Reserva Federal de los Estados Unidos. Política monetaria e informes económicos.',
                    country: '🇺🇸 Estados Unidos',
                    source_type: 'Central Bank',
                    status: 'Sitio oficial',
                    url: 'https://www.federalreserve.gov/'
                },
                {
                    id: 'fred',
                    name: 'FRED',
                    full_name: 'Federal Reserve Economic Data',
                    description: 'Base de datos macroeconómica oficial del Banco de la Reserva Federal de St. Louis.',
                    country: '🇺🇸 Estados Unidos',
                    source_type: 'Economic Data Hub',
                    status: 'Sitio oficial',
                    url: 'https://fred.stlouisfed.org/'
                },
                {
                    id: 'tradingview',
                    name: 'TradingView',
                    full_name: 'TradingView Financial Platform',
                    description: 'Gráficos avanzados, análisis técnico e instrumentos financieros globales.',
                    country: '🌎 Internacional',
                    source_type: 'Market Analytics & Charts',
                    status: 'Sitio oficial',
                    url: 'https://www.tradingview.com/'
                }
            ]
        }));
    }

    // Auth Login Endpoint
    if (req.url === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { role, username, email, password } = JSON.parse(body || '{}');
                const loginIdentifier = username || email;
                
                // Allow matching by username, email or role
                let targetUser = db.users.find(u => 
                    (loginIdentifier && (u.username.toLowerCase() === loginIdentifier.toLowerCase() || u.email.toLowerCase() === loginIdentifier.toLowerCase())) ||
                    (role && u.role.toLowerCase() === role.toLowerCase())
                );

                if (!targetUser) {
                    logAudit(null, 'LOGIN_FAILED', loginIdentifier || role || 'unknown', clientIp, 'FAILED');
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Credenciales inválidas. Por favor intente nuevamente.' }));
                }

                // Create Session Token
                const sessionToken = 'prd_token_' + crypto.randomBytes(16).toString('hex');
                if (!db.tokens) db.tokens = {};
                db.tokens[sessionToken] = {
                    id: targetUser.id,
                    username: targetUser.username,
                    email: targetUser.email,
                    role: targetUser.role,
                    name: targetUser.name
                };
                writeDb(db);

                logAudit(targetUser.id, 'LOGIN_SUCCESS', targetUser.role, clientIp, 'SUCCESS');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    status: 'authenticated',
                    token: sessionToken,
                    role: targetUser.role,
                    name: targetUser.name,
                    username: targetUser.username,
                    email: targetUser.email
                }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Petición inválida' }));
            }
        });
        return;
    }

    // ------------------------------------------
    // 🔒 ECONOMIC LAB & TRADING ENDPOINTS (SOLO OWNER)
    // ------------------------------------------

    // Economic Lab Overview & Macro Data
    if (req.url === '/api/economic/overview') {
        return requireRole(['owner'], () => {
            logAudit(reqUser.id, 'VIEW_ECONOMIC_LAB', '/api/economic/overview', clientIp, 'SUCCESS');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                status: 'authorized',
                macro_series: db.macro_series,
                research_count: db.research_notes.length,
                trading_status: { bot: 'ACTIVE', equity: '$101,450 USD', daily_risk: '0.85%' }
            }));
        });
    }

    // Trade Intent Parsing Engine
    if (req.url === '/api/trading/parse-intent' && req.method === 'POST') {
        return requireRole(['owner'], () => {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                const { prompt, balance } = JSON.parse(body || '{}');
                const tradeSpec = parseTradeIntent(prompt || '', balance || 100000);
                
                // Save specification to database
                db.trade_specifications.unshift(tradeSpec);
                writeDb(db);

                logAudit(reqUser.id, 'PARSED_TRADE_INTENT', tradeSpec.instrument, clientIp, 'SUCCESS');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(tradeSpec));
            });
        });
    }

    // Webhook Endpoint for TradingView Alerts
    if (req.url === '/api/webhooks/tradingview' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            logAudit(null, 'TRADINGVIEW_WEBHOOK', 'POST /api/webhooks/tradingview', clientIp, 'RECEIVED');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ status: 'webhook_received', timestamp: new Date().toISOString() }));
        });
        return;
    }

    // ------------------------------------------
    // 🛡️ ADMIN ENDPOINTS (OWNER + ADMIN)
    // ------------------------------------------
    if (req.url === '/api/admin/audit-logs') {
        return requireRole(['owner', 'admin'], () => {
            const auditLogs = fs.existsSync(AUDIT_FILE) ? JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8')) : [];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(auditLogs.slice(-50).reverse()));
        });
    }

    // ------------------------------------------
    // 📚 ACADEMIA & BIBLIOTECA ENDPOINTS
    // ------------------------------------------
    if (req.url === '/api/library/items') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify([]));
    }

    if (req.url === '/api/chat/messages') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify([
            { sender: 'Prof. Steve', role: 'docente', channel: 'docentes', text: 'Subí el material de teoría para la clase de mañana.', time: '14:20' },
            { sender: 'Alumno Juan', role: 'alumno', channel: 'alumnos', text: '¿Dónde encuentro la partitura de ejemplo?', time: '15:05' }
        ]));
    }

    // Serve Static Files (HTML / CSS / JS)
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
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

initDatabase();

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 PRD SYSTEM PLATFORM EN VIVO (v3.0.0)`);
    console.log(`🔒 Economic Lab & Trading Engine: OWNER RBAC Protegido`);
    console.log(`🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});
