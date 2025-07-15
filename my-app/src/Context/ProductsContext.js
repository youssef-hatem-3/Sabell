import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current page for pagination
  const [totalPages, setTotalPages] = useState(0); // Tracks the total number of pages
  const pageSize = 10; // Number of products per page

  // Fetch products by search key with pagination
  const fetchproductsBysearchKey = async (page = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/product/getProductByNameAndDescription`,
        {
          params: {
            name: searchKey,
            page,
            size: pageSize,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials (cookies or Authorization headers)
        }
      );
      setProducts(response.data.content); // Assuming `content` holds the products
      setTotalPages(response.data.totalPages); // Assuming `totalPages` is provided by the backend
      setCurrentPage(page); // Update the current page
      console.log(response);
      
      
    } catch (err) {
      console.error('Error fetching products by search key:', err);
    }
  };

  // Fetch products by category with pagination
  const fetchproductsByCategory = async (category, page = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/product/getProductsByCategoryId/${category}`,
        {
          params: {
            page,
            size: pageSize,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include credentials (cookies or Authorization headers)
        }
      );

      setProducts(response.data.content); // Assuming `content` holds the products
      setTotalPages(response.data.totalPages); // Assuming `totalPages` is provided by the backend
      setCurrentPage(page); // Update the current page
      console.log(response);
    } catch (err) {
      console.error('Error fetching products by category:', err);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        searchKey,
        setSearchKey,
        currentPage,
        totalPages,
        pageSize,
        fetchproductsBysearchKey,
        fetchproductsByCategory,
        setCurrentPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
