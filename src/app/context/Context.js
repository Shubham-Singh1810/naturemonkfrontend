'use client';

import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const LoggedDataContext = createContext();

// Provider Component
export const LoggedDataProvider = ({ children }) => {
  const [loggedUserData, setLoggedUserData] = useState(null); // Store user data
  const [productList, setProductList] = useState(null); 
  const [cartList, setCartList] = useState(null); 
  const [wishList, setWishList] = useState(null); 

  // Function to update user data globally and persist it in localStorage
  const updateLoggedUserData = (data) => {
    setLoggedUserData(data);

    // Save data to localStorage
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
     
    } 
  console.log('Logged-in user data stored in context and localStorage:', data);
      
   
  };

  // Load user data from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedUserData(JSON.parse(storedUser)); // Restore context state from localStorage
      console.log('User data restored from localStorage:', JSON.parse(storedUser));
    }
    
  }, []);
  useEffect(() => {
  const storedCartList = localStorage.getItem("cartList");
  if (storedCartList) {
    setCartList(JSON.parse(storedCartList));
  } else {
    setCartList([]);
  }
}, []);
 useEffect(() => {
  const storedWishList = localStorage.getItem("wishList");
  if (storedWishList) {
    setWishList(JSON.parse(storedWishList));
  } else {
    setWishList([]);
  }
}, []);

  return (
    <LoggedDataContext.Provider value={{setWishList, wishList, cartList, setCartList, loggedUserData, updateLoggedUserData, setProductList:setProductList, productList:productList }}>
      {children}
    </LoggedDataContext.Provider>
  );
};
