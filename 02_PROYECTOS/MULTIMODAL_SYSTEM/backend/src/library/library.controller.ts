import { Request, Response } from 'express';

export class LibraryController {
  public static getItems(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay recursos digitales guardados en la biblioteca central.'
    });
  }
}
