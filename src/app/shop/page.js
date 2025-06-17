"use client";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PriceFilter from "../Components/PriceFilter";
import ProductCard from "../Components/ProductCard";
import { getProductServ, getCategory } from "../services/product.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [payload, setPayload]=useState({
    searchKey:"",
    pageCount:5,
  })
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
  useEffect(()=>{
    getProductList();
  }, [payload])
  return (
    <div>
      <Navbar selectedItem="Shop" />
      <div className="container">
        <div className="row mx-0 mt-5">
          <div className="col-3 categoryList">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Categories</h4>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                  style={{ height: "15px", opacity: "0.6" }}
                />
              </div>

              <hr className="mt-1" />
              <div>
                {showLoaderCategory
                  ? [1, 2, 3, 4, 5, 6]?.map((v, i) => {
                      return (
                        <div>
                          <div className="d-flex align-items-center py-2 pb-0 px-2  text-light mb-1 shadow-sm rounded border">
                            <Skeleton height={40} width={40} />
                            <div className="ms-2 w-100">
                              <Skeleton width="100%" height={18} />
                              <Skeleton width="100%" height={18} />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : categorylist?.map((v, i) => {
                      return (
                        <div>
                          <div className="d-flex align-items-center p-1 px-2  text-light mb-1 shadow-sm rounded border">
                            <img src={v?.image} />
                            <div className="ms-2">
                              <p>{v?.name}</p>
                              <span>120 Products</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
              <PriceFilter
                values={priceRange}
                onChange={(range) => setPriceRange(range)}
              />
              <div className="mt-4">
                <img
                  className="img-fluid shadow"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-8">
                <input className="form-control" placeholder="Search Product" onChange={(e)=>setPayload({...payload, searchKey:e?.target?.value})}/>
              </div>
              <div className="col-2">
                <select className="form-control" onChange={(e)=>setPayload({...payload, pageCount:e?.target?.value})}>
                  <option>Show</option>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </div>
              <div className="col-2">
                <select className="form-control">
                  <option>Sort By</option>
                </select>
              </div>
            </div>
            <div className="row my-4 ">
              {showLoader
                ? [1, 2, 3, 4, 5, 6]?.map((v, i) => {
                    return (
                      <div className="col-md-4 col-6 mb-3  ">
                        <div className="productCard shadow-sm border ">
                          <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
                            <h6 className="badge border text-dark m-2">
                              <Skeleton height={20} width={100} />
                            </h6>
                            <Skeleton height={20} width={20} />
                          </div>

                          <div className="w-100">
                            <Skeleton height={180} width="100%" />
                          </div>

                          <div className="p-2">
                            <h4>
                              <Skeleton />
                            </h4>
                            <p>
                              <Skeleton />
                            </p>

                            <div className="w-100 ">
                              <Skeleton height={30} width="100%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : productlist?.map((v, i) => {
                    return (
                      <div className="col-md-4 col-6 mb-3">
                        <ProductCard value={v} />
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
