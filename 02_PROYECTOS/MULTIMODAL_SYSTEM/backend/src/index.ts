import { createApp } from './app/app';
import { config } from './app/config';

const app = createApp();

app.listen(config.port, () => {
  console.log(`[PRD_SYSTEM BACKEND CENTRAL] Ejecutándose en puerto ${config.port} en entorno ${config.env}`);
});
