"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/Context";
import "../globals.css";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";
const Navbar = ({ selectedItem }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedUserData, cartList, setCartList } =
    useContext(LoggedDataContext);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 🔁 Conditional navigation logic
  const handleProfileClick = () => {
    console.log(loggedUserData);
    if (loggedUserData) {
      router.push("/profile");
    } else {
      router.push("/signup");
    }
  };
  const navArr = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "Bulk Order",
      link: "/bulk-order",
    },
    {
      name: "Combo Packs",
      link: "/combo-products",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
    {
      name: "About",
      link: "/about-us",
    },
    
  ];
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
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handleProceedToCheckout = () => {
    setShowPaymentPopup(true);
  };
  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };
  const initiatePayment = () => {
    const amount = cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );

    const options = {
      key: "rzp_test_fT349CvRXH2mv0",
      amount: amount * 100,
      currency: "INR",
      name: "Gustosa Foods",
      description: "Purchase Transaction",
      image: "/assets/logo.png",
      handler: function (response) {
        console.log(response);
        alert(
          "Payment Successful! Payment ID: " + response.razorpay_payment_id
        );
        setShowPaymentPopup(false);
      },
      prefill: {
        name: loggedUserData?.name || "Guest User",
        email: loggedUserData?.email || "guest@example.com",
        contact: loggedUserData?.mobile || "9996588662",
      },
      theme: {
        color: "#3D9970",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const [userFormData, setUserFormData] = useState({
    phone: "",
    otp: "",
  });
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const sendOtpFunc = async () => {
    try {
      let response = await otpSend(userFormData);
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        setShowPhoneInput(true);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  const otpVerifyFunc = async () => {
    try {
      let response = await otpVerify(userFormData);
      if (response?.data?.statusCode == "200") {
        toast.success(response?.data?.message);
        setShowPhoneInput(true);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <>
      <div className="navbar-outer d-flex py-3 justify-content-between align-items-center">
        {/* 🔷 Logo */}
        <div className="logo">
          <Link href="/">
            <img src="/assets/brandLogo.png" alt="logo" className="logo-img" />
          </Link>
        </div>
        <ul
          className={`nav-links list-unstyled mb-0 ${menuOpen ? "open" : ""}`}
        >
          {navArr?.map((v, i) => {
            return (
              <li key={i}>
                <Link
                  href={v?.link}
                  style={{
                    color: selectedItem == v?.name ? "#0DAF58" : "#000",
                    opacity: selectedItem == v?.name ? "1" : "0.6",
                    fontWeight: selectedItem == v?.name ? "600" : "400",
                  }}
                >
                  {v?.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="nav-icons d-flex gap-4 align-items-center navRight">
          <div className="d-flex align-items-center ">
            <img
              src="https://cdn-icons-png.flaticon.com/128/665/665865.png"
              alt="notification-icon"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
            />
            <div className="notificationDiv">
              <p>
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}
              </p>
            </div>
          </div>
          {loggedUserData && loggedUserData.profilePic ? (
            <img
              src={loggedUserData.profilePic}
              alt="user-profile"
              // className="rounded-circle"
              title="Go to Profile"
              onClick={handleProfileClick}
              style={{
                cursor: "pointer",
                objectFit: "cover",
              }}
              className="d-md-block d-none"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
              alt="profile-icon"
              title="Sign Up / Login"
              onClick={handleProfileClick}
              className="d-md-block d-none"
            />
          )}

          {/* Cart Sidebar */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="cartSidebar"
            style={{ fontFamily: "poppins" }}
          >
            <div className="offcanvas-header">
              <h5>
                Your Cart (
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}{" "}
                Products)
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>

            <div className="offcanvas-body">
              {cartList?.map((item) => (
                <div className="d-flex mb-3" key={item.id}>
                  <img
                    src={item.productHeroImage}
                    className="me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <h6>{item.name}</h6>

                    <div className="d-flex counterDiv ">
                      <p
                        style={{ borderColor: "red" }}
                        onClick={(e) => handleDecreaseQty(e, item)}
                      >
                        -
                      </p>
                      <p>
                        {/* {
                          cartList.find((item) => item._id === value._id)
                            ?.quantity
                        } */}
                        {item?.quantity}
                      </p>
                      <p
                        style={{ borderColor: "green" }}
                        onClick={(e) => handleIncreaseQty(e, item)}
                      >
                        +
                      </p>
                    </div>
                    <p className="text-muted mt-1">
                      <del>₹{item?.price}</del> ₹{item?.discountedPrice}
                    </p>
                  </div>
                </div>
              ))}
              {cartList?.length >0 && <>
               <hr />

              <h6>
                SUBTOTAL: ₹ (
                {cartList?.reduce(
                  (total, item) => total + item.discountedPrice * item.quantity,
                  0
                )}
                )
              </h6>
             
              <button
                className="btn btn-danger w-100 mt-4"
                onClick={()=>router.push("/check-out")}
              >
                Proceed To Checkout
              </button></>}
             
            </div>
          </div>
        </div>
      </div>
      {/* Payment Popup */}
      {/* {showPaymentPopup && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-md-4  px-2 py-4 rounded"
            style={{ width: "600px", maxWidth: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontFamily: "poppins" }}>Payment Summary</h4>
              <button
                className="btn-close"
                onClick={handleClosePaymentPopup}
              ></button>
            </div>

            {loggedUserData?._id ? (
              <div className="border rounded p-3 mb-4">
                <div className="d-flex justify-content-between align-items-center mx-2 mb-2">
                  <h4 className="mb-0">Delivery Address</h4>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                    style={{ height: "15px", opacity: "0.6" }}
                  />
                </div>

                <div className="row m-0 p-0">
                  <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control"
                      placeholder="Enter Full Name"
                      style={{ height: "45px" }}
                    />
                  </div>
                  <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="Enter Phone"
                      style={{ height: "45px" }}
                    />
                  </div>

                  <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="Enter Alternative Phone"
                      style={{ height: "45px" }}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                    <textarea
                      className="form-control "
                      placeholder="Area"
                      style={{ height: "45px" }}
                    />
                  </div>

                  <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="Landmark"
                      style={{ height: "45px" }}
                    />
                  </div>
                  <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="Pincode"
                      style={{ height: "45px" }}
                    />
                  </div>
                  <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="City"
                      style={{ height: "45px" }}
                    />
                  </div>
                  <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="State"
                      style={{ height: "45px" }}
                    />
                  </div>
                  <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                    <input
                      className="form-control "
                      placeholder="Country"
                      style={{ height: "45px" }}
                    />
                  </div>
                </div>

                <button className="btn btn-success w-100  mt-2">Save</button>
              </div>
            ) : (
              <div className="border rounded p-3 mb-4">
                <h4 style={{ fontFamily: "sans-serif" }}>
                  Please Verify your phone number
                </h4>
                <label>Phone Number</label>
                <input
                  value={userFormData?.phone}
                  className="form-control"
                  placeholder="Enter number"
                  type="text"
                  style={{ height: "45px" , zIndex:"10000"}}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, phone: e.target.value })
                  }
                />

                {showPhoneInput && (
                  <input
                    value={userFormData?.otp}
                    className="form-control mt-2"
                    placeholder="Enter OTP"
                    style={{ height: "45px" }}
                    onChange={(e) =>
                      setUserFormData({ ...userFormData, otp: e.target.value })
                    }
                  />
                )}
                {showPhoneInput ? (
                  <button
                    className="btn btn-success w-100  mt-2"
                    onClick={() => sendOtpFunc()}
                  >
                    Verify OTP
                  </button>
                ) : (
                  <button
                    className="btn btn-primary w-100  mt-2"
                    onClick={() => otpVerifyFunc()}
                  >
                    Send OTP
                  </button>
                )}
              </div>
            )}
            <p style={{ fontFamily: "poppins" }}>
              Total Products:{" "}
              {cartList?.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p style={{ fontFamily: "poppins" }}>
              Subtotal: ₹
              {cartList?.reduce(
                (total, item) => total + item.discountedPrice * item.quantity,
                0
              )}
            </p>
            <button className="btn btn-warning w-100" onClick={initiatePayment}>
              Pay Now
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;
