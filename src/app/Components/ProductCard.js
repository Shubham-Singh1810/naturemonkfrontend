"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { addToCartServ } from "../services/product.service";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/Context";

function ProductCard({ value }) {
  const { loggedUserData, cartList, setCartList, wishList, setWishList } =
    useContext(LoggedDataContext);
  const router = useRouter();

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (loggedUserData?._id) {
      try {
        let response = await addToCartServ({
          productId: id,
          userId: loggedUserData?._id,
        });
        if (response?.statusCode == "200") {
          toast.success(response?.message);
        }
      } catch (error) {
        toast.error("Internal Server Error");
      }
    }
  };

  const handleAddToCartLocal = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

      const existingProduct = localCartList.find((item) => item._id === v._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        localCartList.push({ ...v, quantity: 1 });
      }

      localStorage.setItem("cartList", JSON.stringify(localCartList));
      setCartList(localCartList);
      toast.success("Item Added To the cart");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const handleAddToWishListLocal = (e, v) => {
  e.preventDefault();
  e.stopPropagation();
  try {
    let localWishList = JSON.parse(localStorage.getItem("wishList")) || [];

    // Check if product already exists in wishlist
    const existingProductIndex = localWishList.findIndex(
      (item) => item._id === v._id
    );

    if (existingProductIndex !== -1) {
      // If exists, remove it
      localWishList.splice(existingProductIndex, 1);
      toast.info("Item Removed From Wishlist");
    } else {
      // If not exists, add it
      localWishList.push(v);
      toast.success("Item Added To Wishlist");
    }

    // Update localStorage and state
    localStorage.setItem("wishList", JSON.stringify(localWishList));
    setWishList(localWishList);

  } catch (error) {
    console.log("Something went wrong", error);
  }
};



  const handleIncreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = localCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("cartList", JSON.stringify(localCartList));
    setCartList(localCartList);
  };

  const handleDecreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = localCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localCartList = localCartList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("cartList", JSON.stringify(localCartList));
    setCartList(localCartList);
  };

  return (
    <div
      className="productCard shadow-sm border"
      onClick={() => router.push("/product-details/" + value?._id)}
    >
      
      <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
        <h6 className="badge border text-dark m-2">
          {value?.categoryDetails ? value?.categoryDetails[0]?.name : "Category"}
        </h6>
        <img onClick={(e)=>handleAddToWishListLocal(e, value)}
         src={ wishList?.find((item) => item._id === value._id) ?  "https://cdn-icons-png.flaticon.com/128/2077/2077502.png" : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"} />
      </div>

      <div className="d-flex justify-content-center">
        <img src={value?.productHeroImage} className="img-fluid" />
      </div>

      <div className="p-2">
        <h4>{value?.name}</h4>
        <p>
          <s className="text-danger">{value?.price}</s>{" "}
          <span className="text-success text-bold">
            {value?.discountedPrice} &#8377;
          </span>
        </p>
        <p className="mb-md-3 mb-1 text-secondary">{value?.itemWeight} g</p>

        <div className="d-flex justify-content-around align-items-center" >
          {cartList?.find((item) => item._id === value._id) ? (
            <div className="d-flex counterDiv " >
              <p style={{borderColor:"red"}} onClick={(e) => handleDecreaseQty(e, value)}>-</p>
              <p>{cartList.find((item) => item._id === value._id)?.quantity}</p>
              <p style={{borderColor:"green"}}  onClick={(e) => handleIncreaseQty(e, value)}>+</p>
            </div>
          ) : (
            <button onClick={(e) => handleAddToCartLocal(e, value)} className="bg-danger" >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
