import { Request, Response } from 'express';

export class TradingController {
  public static getStrategies(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay estrategias de trading registradas.'
    });
  }

  public static getBacktesting(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      results: [],
      message: 'Sin ejecuciones de backtesting activas.'
    });
  }
}
