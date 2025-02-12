import React, { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const newProduct = { name: "New Product", quantity: 10, price: 20 };
    const addedProduct = await addProduct(newProduct);
    setProducts([...products, addedProduct]);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div>
      <h1>Inventory Management System</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.quantity} - ${product.price}
            <button onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
