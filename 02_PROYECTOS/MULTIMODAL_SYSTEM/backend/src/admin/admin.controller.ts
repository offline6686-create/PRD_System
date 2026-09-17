import { Request, Response } from 'express';

export class AdminController {
  public static getStats(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      stats: {
        users: 4, // Initial root users
        students: 0,
        teachers: 0,
        clients: 0,
        courses: 0,
        orders: 0,
        economicSeries: 0,
        tradingBots: 0,
        systemLogs: 0
      }
    });
  }

  public static getLogs(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      logs: [],
      message: 'No hay eventos de auditoría críticos registrados.'
    });
  }
}
