import { Request, Response } from 'express';
import cartService from '@services/cart.service';


export const getCart = async (req: Request, res: Response) => {
    try {
      const {sessionToken } = req.query;
  
      //TODO: Implement users logic method in cartService
      const cart = await cartService.getCart(undefined, sessionToken as string);
      
      res.status(200).json({ cart });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  export const updateItemInCart = async (req: Request, res: Response) => {
    try {
      const { userId, sessionToken, productId, quantityChange } = req.body;
      await cartService.updateItemInCart(userId, sessionToken, productId, quantityChange);
      res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  export const removeItemFromCart = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
  
      await cartService.removeItemFromCart(parseInt(itemId, 10));
  
      res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  export const getCartInvoice = async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string, 10) : undefined;
      const sessionToken = req.query.sessionToken as string | undefined;
  
      const invoice = await cartService.getCartInvoice(userId, sessionToken);
  
      if (!invoice) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cart invoice' });
    }
};

  export default {
    getCart,
    updateItemInCart,
    removeItemFromCart,
    getCartInvoice,
  }