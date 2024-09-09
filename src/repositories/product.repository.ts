import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllProducts = async () => {
  return await prisma.product.findMany();
};

const findProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

const updateProductStock = async (productId: number, newStock: number) => {
  return await prisma.product.update({
    where: { id: productId },
    data: { stock: newStock }
  });
};

export default {
  getAllProducts,
  findProductById,
  updateProductStock

};
