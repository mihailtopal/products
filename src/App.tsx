import React, { useEffect } from "react";
import "./App.css";
import useProductStore from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
