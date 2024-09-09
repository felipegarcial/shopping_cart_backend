import express from 'express';
import productController from '@controllers/product.controller';

const router = express.Router();

/**
* @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Gafas de sol Carey"
 *         description:
 *           type: string
 *           description: A brief description of the product
 *           example: "High-quality sunglasses"
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *           example: 39.99
 *         type:
 *           type: string
 *           enum: [PRODUCTO, EVENTO]
 *           description: The type of the item (either PRODUCTO or EVENTO)
 *           example: "PRODUCTO"
 *         thumbnail:
 *           type: string
 *           description: URL of the product image
 *           example: "https://example.com/product.jpg"
 *         stock:
 *           type: integer
 *           description: The number of items in stock
 *           example: 100
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the product was added
 *           example: "2023-08-01T15:00:00Z"
 */

/**
* @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products from the database.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 * */
router.get('/', productController.getAllProducts); 

/**
* @swagger
* /products/{id}:
*   get:
*     summary: Get a product by its ID
*     description: Retrieve a specific product based on its ID.
*     tags:
*       - Products
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: The ID of the product to retrieve
*     responses:
*       200:
*         description: A product object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Product'
*       400:
*         description: Invalid product ID
*       404:
*         description: Product not found
*       500:
*         description: Internal server error
*/
router.get('/:id', productController.getProductById);

export default router;
