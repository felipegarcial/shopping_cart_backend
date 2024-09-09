import productRepository from '@repositories/product.repository';

const getProducts = async () => {
    return await productRepository.getAllProducts();
};

const getProductById = async (id: number) => {
    return await productRepository.findProductById(id);
  };

export default {
    getProducts,
    getProductById
}

