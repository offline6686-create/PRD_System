import { Request, Response } from 'express';

export class MusicController {
  public static getCourses(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay cursos cargados.'
    });
  }

  public static getClasses(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay clases programadas.'
    });
  }

  public static getRecordings(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay grabaciones disponibles.'
    });
  }

  public static createZoomMeeting(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      meeting: null,
      message: 'Zoom Provider configurado en backend.'
    });
  }
}
