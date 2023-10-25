const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.path = "productos.json";
    this.products = [];
    this.productId = 1;
  }

  async addProduct(productData) {
    if (this.products.length === 0) {
      await fs.writeFile(this.path, "[]", "utf-8");
    }
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);

      const newProduct = {
        id: this.productId++,
        ...productData,
      };

      products.push(newProduct);

      await fs.writeFile(this.path, JSON.stringify(products), "utf-8");

      this.products = products;

      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  }

  async getProducts() {
    try {
      if (this.products.length === 0) {
        return [];
      }
      const data = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);

      return this.products;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);

      const product = products.find((p) => p.id === id);

      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
    }
  }

  async updateProduct(id, productData) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);

      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        return "El producto no existe.";
      }

      const updatedProduct = {
        id,
        ...productData,
      };

      products[productIndex] = updatedProduct;

      await fs.writeFile(this.path, JSON.stringify(products), "utf-8");

      this.products = products;

      return updatedProduct;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);

      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex === -1) {
        return "El producto no existe.";
      }

      products.splice(productIndex, 1);

      await fs.writeFile(this.path, JSON.stringify(products), "utf-8");

      this.products = products;

      return `El producto con ID ${id} ha sido eliminado.`;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
}

async function testProductManager() {
  const productManager = new ProductManager();

  try {
    const newProduct = await productManager.addProduct({
      title: "Producto 1",
      description: "Descripción del producto 1",
      price: 10,
      thumbnail: "https://www.example.com/product1.jpg",
      code: "ABC123",
      stock: 100,
    });
    console.log("Nuevo producto:", newProduct);

    const allProducts = await productManager.getProducts();
    console.log("Todos los productos:", allProducts);

    const productById = await productManager.getProductById(newProduct.id);
    console.log("Producto por ID:", productById);

    const updatedProduct = await productManager.updateProduct(newProduct.id, {
      price: 15,
    });
    console.log("Producto actualizado:", updatedProduct);

    const deletionResult = await productManager.deleteProduct(newProduct.id);
    console.log("Resultado de la eliminación:", deletionResult);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

testProductManager();
