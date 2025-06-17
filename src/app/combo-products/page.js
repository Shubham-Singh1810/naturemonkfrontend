"use client";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PriceFilter from "../Components/PriceFilter";
import ProductCard from "../Components/ProductCard";
import { getProductServ, getCategory } from "../services/product.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ComboProductCard from "../Components/ComboProductCard";

const page = () => {
  const [priceRange, setPriceRange] = useState([50, 400]);
  const [productlist, setProductList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [showLoaderCategory, setShowLoaderCategory] = useState(false);
  const [categorylist, setCategoryList] = useState([]);
  const getCategoryList = async () => {
    setShowLoaderCategory(true);
    try {
      let response = await getCategory();
      console.log(response?.data);
      if (response?.statusCode == "200") {
        setCategoryList(response?.data);
      }
    } catch (error) {}
    setShowLoaderCategory(false);
  };
  useEffect(() => {
    getCategoryList();
  }, []);
  const [payload, setPayload] = useState({
    searchKey: "",
    pageCount: 5,
  });
  const getProductList = async () => {
    setShowLoader(true);
    try {
      let response = await getProductServ(payload);
      console.log(response?.data);
      if (response?.statusCode == "200") {
        setProductList(response?.data);
      }
    } catch (error) {}
    setShowLoader(false);
  };
  useEffect(() => {
    getProductList();
  }, [payload]);
  return (
    <div>
      <Navbar selectedItem="Combo Packs" />
      <div className="container productSliderDiv">
        <div className="row mx-0 mt-md-5 mt-2">
          <h5 className="my-md-4 my-2">Discover our best combo products</h5>
          {productlist?.map((v, i) => {
            return (
              <div className="col-md-3 col-12 mb-3">
                <ComboProductCard value={v} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
