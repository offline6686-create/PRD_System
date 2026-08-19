const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Endpoints para integraciones interactivas
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', system: 'PRD_System', time: new Date() });
});

// Endpoint de prueba del Trading Bot Status
app.get('/api/trading/status', (req, res) => {
    res.json({
        bot_status: 'ACTIVE',
        rules: 'FTMO Challenge ($100,000 USD)',
        daily_loss_percent: '0.85%',
        max_daily_limit: '5.0%',
        total_pnl_usd: '+$1,450.00',
        audit_hash: 'a3f9e81b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f'
    });
});

// Endpoint de prueba del Dashboard Economico
app.get('/api/economy/summary', (req, res) => {
    res.json({
        fed_rate: '4.50%',
        us_cpi_yoy: '2.4%',
        ecb_refi_rate: '3.00%',
        bcra_reserves_usd: '$31,000 M',
        bcra_ipc_monthly: '2.1%',
        gdp_forecast_global: '+3.2%'
    });
});

app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 PRD_SYSTEM PORTAL UNIFICADO EN VIVO`);
    console.log(`🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});
