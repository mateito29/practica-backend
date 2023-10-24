const { promises: fs } = require("fs");
class ProductManager {
  constructor() {
    this.path = "./productos.json";
    this.products = [];
    this.productId = 1;
  }

  async addProduct(productData) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const newProduct = {
      id: this.productId++,
      ...productData,
    };

    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products));

    this.products = products;

    return newProduct;
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    this.products = products;

    return products;
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const product = products.find((p) => p.id === id);

    return product;
  }

  async updateProduct(id, productData) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return "El producto no existe.";
    }

    const updatedProduct = {
      id,
      ...productData,
    };

    products[productIndex] = updatedProduct;

    await fs.writeFile(this.path, JSON.stringify(products));

    this.products = products;

    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      return "El producto no existe.";
    }

    products.splice(productIndex, 1);

    await fs.writeFile(this.path, JSON.stringify(products));

    this.products = products;

    return `El producto con id ${id} ha sido eliminado.`;
  }
}
