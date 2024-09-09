import { Router } from "express";
import cartController from "@controllers/cart.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The cart item ID
 *           example: 1
 *         productId:
 *           type: integer
 *           description: The ID of the product
 *           example: 1
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart
 *           example: 3
 *     Invoice:
 *       type: object
 *       properties:
 *         subtotal:
 *           type: number
 *           description: Subtotal of all items in the cart
 *           example: 419.97
 *         total:
 *           type: number
 *           description: Total price including all calculations
 *           example: 419.97
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *     AddItemRequest:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         userId:
 *           type: integer
 *           description: The user ID (optional for logged in users)
 *           example: 1
 *         sessionToken:
 *           type: string
 *           description: Session token (for anonymous users)
 *           example: 'abc123'
 *         productId:
 *           type: integer
 *           description: ID of the product to add to the cart
 *           example: 1
 *         quantity:
 *           type: integer
 *           description: Number of products to add
 *           example: 2
 */


/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get the current cart
 *     description: Retrieve the current cart based on user ID or session token.
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: sessionToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The session token (for anonymous users)
 *     responses:
 *       200:
 *         description: The current cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       404:
 *         description: Cart not found
 */
router.get("/", cartController.getCart);

/**
 * @swagger
 * /cart/invoice:
 *   get:
 *     summary: Get the invoice for the current cart
 *     description: Retrieve the invoice of the cart with subtotals and total price.
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: sessionToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The session token (for anonymous users)
 *     responses:
 *       200:
 *         description: Invoice with subtotals and total price
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Cart not found
 */
router.get("/invoice", cartController.getCartInvoice);

/**
 * @swagger
 * /cart/update-item:
 *   post:
 *     summary: Update cart item quantity
 *     description: Add or remove products from a cart item with possitve or negative numbers. If the quantity reaches 0, the item is removed.
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user (optional for anonymous carts)
 *               sessionToken:
 *                 type: string
 *                 description: Session token of the cart (required for anonymous users)
 *               productId:
 *                 type: integer
 *                 description: ID of the product
 *               quantityChange:
 *                 type: integer
 *                 description: Quantity to add or remove. Positive to add, negative to remove.
 *             example:
 *               userId: null
 *               sessionToken: "abc123"
 *               productId: 1
 *               quantityChange: 2
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Error updating item in cart
 */

router.post("/update-item", cartController.updateItemInCart);

/**
 * @swagger
 * /cart/remove-item/{itemId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     description: Remove an item from the cart by its ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to remove
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Cart item not found
 */
router.delete("/remove-item/:itemId", cartController.removeItemFromCart);

export default router;
