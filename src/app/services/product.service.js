


import axios from "axios";

import { BASE_URL } from ".././utils/apibaseurlConfiguration";

// all products

export const getProductServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "product/list", payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};
export const placeOrderServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "booking/create", payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};

// product details

export async function getProduct(id) {
  try {
    const res = await axios.get(BASE_URL+`product/details/${id}`);
    //  console.log(res.data.data);
    return res.data.data;
   
  } 
  catch (error) {
    throw new Error('Product not found');
  }
}


// product categories

export const getCategory = async () => {
  try {
    const response = await axios.post(BASE_URL + "category/list");
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error; 
  }
};

// add to cart
export const addToCartServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "user/add-to-cart/"+payload?.productId, {userId:payload?.userId});
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};