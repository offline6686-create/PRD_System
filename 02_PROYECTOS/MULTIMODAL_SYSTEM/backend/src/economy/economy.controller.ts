import { Request, Response } from 'express';

const SOURCES = [
  { id: 'fred', name: 'St. Louis FED (FRED)', country: 'USA', status: 'REQUIRES_API_KEY' },
  { id: 'bcra', name: 'Banco Central de la República Argentina (BCRA)', country: 'ARG', status: 'AVAILABLE' },
  { id: 'byma', name: 'Bolsas y Mercados Argentinos (BYMA)', country: 'ARG', status: 'REQUIRES_SUBSCRIPTION' },
  { id: 'ecb', name: 'European Central Bank (ECB)', country: 'EUR', status: 'AVAILABLE' },
  { id: 'imf', name: 'International Monetary Fund (IMF)', country: 'GLOBAL', status: 'AVAILABLE' },
  { id: 'worldbank', name: 'World Bank Open Data', country: 'GLOBAL', status: 'AVAILABLE' },
  { id: 'bis', name: 'Bank for International Settlements (BIS)', country: 'GLOBAL', status: 'AVAILABLE' },
  { id: 'indec', name: 'Instituto Nacional de Estadística y Censos (INDEC)', country: 'ARG', status: 'AVAILABLE' }
];

export class EconomyController {
  public static getProviders(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: SOURCES
    });
  }

  public static getIndicators(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay indicadores económicos sincronizados. Configure una fuente para comenzar.'
    });
  }

  public static getStatus(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      status: 'ONLINE',
      totalProviders: SOURCES.length
    });
  }
}
