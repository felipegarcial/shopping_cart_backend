import cartRepository from '@repositories/cart.repository';
import productRepository from '@repositories/product.repository';


const getCart = async (userId?: string | undefined, sessionToken?: string | undefined) => {
  const parsedUserId = userId ? parseInt(userId, 10) : undefined;
  return await cartRepository.getCart(parsedUserId, sessionToken);
};

const updateItemInCart = async (
  userId: number | undefined,
  sessionToken: string | undefined,
  productId: number,
  quantityChange: number
) => {

  let cart = await cartRepository.getCart(userId, sessionToken)
    ?? await cartRepository.createCart(userId, sessionToken);

  const product = await productRepository.findProductById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const existingItem = cart.cartItems?.find((item) => item.productId === productId);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantityChange;

    // Verificar si la nueva cantidad supera el stock disponible
    if (newQuantity > product.stock) {
      throw new Error(`Cannot add more than available stock (${product.stock})`);
    }

    // Si la nueva cantidad es 0 o menor, eliminar el ítem del carrito
    if (newQuantity <= 0) {
      return await cartRepository.removeCartItem(existingItem.id);
    } else {
      return await cartRepository.updateCartItem(existingItem.id, newQuantity);
    }
  } else {
    if (quantityChange <= 0) {
      throw new Error('Cannot reduce quantity of a non-existent item');
    }

    if (quantityChange > product.stock) {
      throw new Error(`Cannot add more than available stock (${product.stock})`);
    }
    return await cartRepository.addItemToCart(cart.id, productId, quantityChange);
  }
};

const removeItemFromCart = async (itemId: number) => {
  const cartItem = await cartRepository.findCartItemById(itemId);

  if (!cartItem) {
    throw new Error('CartItem not found');
  }

  const product = await productRepository.findProductById(cartItem.productId);

  if (!product) {
    throw new Error('Product not found');
  }

  await productRepository.updateProductStock(product.id, product.stock + cartItem.quantity);

  return await cartRepository.removeCartItem(itemId);
};


const getCartInvoice = async (userId?: number, sessionToken?: string) => {
  const cart = await cartRepository.getCart(userId, sessionToken);

  if (!cart || !cart.cartItems.length) {
    return null;
  }

  let total = 0;
  const items = [];

  for (const cartItem of cart.cartItems) {
    const product = await productRepository.findProductById(cartItem.productId);
    if (!product) continue;

    const subtotal = product.price * cartItem.quantity;
    total += subtotal;

    items.push({
      productId: product.id,
      name: product.name,
      quantity: cartItem.quantity,
      price: product.price,
      subtotal
    });
  }

  return {
    subtotal: total,
    total,           
    items        
  };
};

export default {
  getCart,
  updateItemInCart,
  removeItemFromCart,
  getCartInvoice
};
