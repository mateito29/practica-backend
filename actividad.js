class ProductManager {
  constructor() {
    this.products = [];
    this.productId = 1;
  }

  addProduct(productData) {
    if (
      !productData.title ||
      !productData.description ||
      !productData.price ||
      !productData.thumbnail ||
      !productData.code ||
      !productData.stock
    ) {
      return "Todos los campos son obligatorios.";
    }
    if (this.products.some((product) => product.code === productData.code)) {
      return "El campo 'code' ya existe.";
    }

    const product = {
      id: this.productId++,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      thumbnail: productData.thumbnail,
      code: productData.code,
      stock: productData.stock,
    };

    this.products.push(product);

    return `El producto ${product.title} ha sido agregado exitosamente.`;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(
      (product) => product.id === parseInt(id)
    );
    if (!product) {
      return "El producto no existe.";
    }
    return product;
  }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());
console.log(
  productManager.addProduct({
    title: "producto prueba",
    description: "esto es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25,
  })
);
console.log(productManager.getProducts());
console.log(
  productManager.addProduct({
    title: "producto prueba",
    description: "esto es un producto prueba",
    price: 200,
    thumbnail: "sin imagen",
    code: "abc123",
    stock: 25,
  })
);
console.log(productManager.getProductById(10));
console.log(productManager.getProductById(1));
