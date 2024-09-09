import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getCart = async (userId?: number, sessionToken?: string) => {
    return await prisma.cart.findFirst({
      where: {
        OR: [
          { userId: userId || undefined },
          { sessionToken: sessionToken || undefined }
        ]
      },
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });
  };
  
  const createCart = async (userId?: number, sessionToken?: string) => {
    return await prisma.cart.create({
      data: {
        userId: userId || null,
        sessionToken: sessionToken || null,
        total: 0
      },
      include: {
        cartItems: true
      }
    });
  };
  
  
const addItemToCart = async (cartId: number, productId: number, quantity: number) => {
  return await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  });
};

const updateCartItem = async (itemId: number, quantity: number) => {
  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
};

const removeCartItem = async (itemId: number) => {
  return await prisma.cartItem.delete({
    where: { id: itemId },
  });
};

const findCartItemById = async (itemId: number) => {
    return await prisma.cartItem.findUnique({
      where: {
        id: itemId,
      },
    });
  };

export default {
getCart,
createCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  findCartItemById
};
