import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: '*' }));
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'online',
      system: 'PRD_SYSTEM',
      module: 'MULTIMODAL_SYSTEM Backend Central',
      version: '1.0.0'
    });
  });

  app.use('/api', routes);
  app.use(errorHandler);

  return app;
};
