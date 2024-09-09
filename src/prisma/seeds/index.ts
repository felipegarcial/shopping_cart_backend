import { PrismaClient, TypeProductEnum } from '@prisma/client';
import { products } from './products';

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            type: product.type as TypeProductEnum,
            thumbnail: product.thumbnail,
            stock: product.stock,
          },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
