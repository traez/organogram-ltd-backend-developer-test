import products from "../model/productsModel.js";

// Generate ID
function generateId() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  const getRandomItem = set => set[Math.floor(Math.random() * set.length)];

  const randomLetters = getRandomItem(alphabet) + getRandomItem(alphabet);
  const randomNumbers = getRandomItem(numbers) + getRandomItem(numbers);

  const randomId = randomLetters + randomNumbers.split('').sort(() => Math.random() - 0.5).join('');

  return randomId;
}

//Get date in this format: "DD-MM-YYYY"
function getCurrentDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

// Get all products
let getProducts = (req, res) => {
  res.json(products);
};

// Get a specific product by SKU ID
let getProductById = (req, res) => {
  const skuid = req.params.id;
  const product = products.find((p) => p.skuid === skuid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

// Create a new product
let createProduct = (req, res) => {
  const { merchant, productname, productdescription, productprice } = req.body;
  const newProduct = {
    merchant,
    skuid: generateId(),
    productname,
    productdescription,
    productprice,
    dateAdded: getCurrentDate() 
  };
  products.push(newProduct);
  res.json(newProduct);
};

// Delete a product by SKU ID
let deleteProduct = (req, res) => {
  const skuid = req.params.id;
  const newProducts = products.filter((p) => p.skuid !== skuid);
  if (newProducts.length < products.length) {
    products.splice(0, products.length, ...newProducts);
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

// Update a product by SKU ID
let updateProduct = (req, res) => {
  const skuid = req.params.id;
  const { productname, productdescription, productprice } = req.body;
  const index = products.findIndex((p) => p.skuid === skuid);

  if (index !== -1) {
    const { skuid: existingSkuid, dateAdded: existingDateAdded, merchant: existingMerchant, ...updatedProduct } = req.body;

    products[index] = {
      ...products[index],
      productname: updatedProduct.productname || products[index].productname,
      productdescription: updatedProduct.productdescription || products[index].productdescription,
      productprice: updatedProduct.productprice || products[index].productprice,
    };

    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};

export { getProducts, getProductById, createProduct, deleteProduct, updateProduct };
