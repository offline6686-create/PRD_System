import { Request, Response } from 'express';

export class EcommerceController {
  public static getProducts(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'Todavía no hay productos publicados en el catálogo.'
    });
  }

  public static getCart(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      items: [],
      total: 0.00
    });
  }

  public static checkout(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      provider: 'MercadoPagoProvider',
      message: 'Checkout API configurado. Mercado Pago Provider listo.'
    });
  }

  public static getMyOrders(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      orders: [],
      message: 'Todavía no ha realizado pedidos.'
    });
  }
}
