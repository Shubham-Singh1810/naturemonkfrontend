"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/Context";
import Navbar from "../Components/Navbar";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";
import {
  addressCreate,
  addressList,
  addressDelete,
  addressUpdate,
} from "../services/address.service";
import {placeOrderServ} from "../services/product.service"

const Page = () => {
  const { loggedUserData, cartList, updateLoggedUserData , setCartList} =
    useContext(LoggedDataContext);
  const router = useRouter();
  const [editAddress, setEditAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    phone: "",
    alternatePhone: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    fullName: "",
  });
  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = async () => {
    try {
      const res = await addressList({userId:loggedUserData?._id});
      setAddresses(res?.data || []);
      setAddressForm(res?.data[0]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    if (loggedUserData) {
      fetchAddresses();
    }
  }, [loggedUserData]);

  const [userFormData, setUserFormData] = useState({
    phone: "",
    phoneOtp: "",
  });
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const sendOtpFunc = async () => {
    try {
      let response = await otpSend(userFormData);
      if (response?.statusCode == "200") {
        toast.success(response?.message);
        setShowPhoneInput(true);
      }
    } catch (error) {
      console.log(error?.response?.message);
    }
  };
  const otpVerifyFunc = async () => {
    try {
      let response = await otpVerify(userFormData);
      if (response?.statusCode == "200") {
        toast.success(response?.message);
        updateLoggedUserData(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  
  const [orderPayload, setOrderPayload]=useState({
    userId: loggedUserData?._id || "",

    product: cartList?.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage,
    })),
    totalAmount: cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    ),
    address: addressForm,
  });

  useEffect(() => {
  if (!loggedUserData || !cartList) return;

  setOrderPayload({
    userId: loggedUserData._id,
    product: cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage,
    })),
    totalAmount: cartList.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    ),
    address: addressForm,
  });
}, [loggedUserData, cartList, addressForm]);


  const placeOrderFunc = async ()=>{
    try {
      let response = await placeOrderServ(orderPayload);
      if(response?.statusCode=="200"){
        toast.success(response?.message);
        setCartList([]);
        localStorage.removeItem("cartList")
        router.push("/");
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Payment initiation function same as before
  const initiatePayment = () => {
    const amount = cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );

    const options = {
      key: "rzp_test_fT349CvRXH2mv0",
      amount: amount * 100,
      currency: "INR",
      name: "Hyzenith",
      description: "Purchase Transaction",
      image: "/assets/logo.jpeg",
      handler: function (response) {
        console.log(response);
        setOrderPayload({...orderPayload, paymentId : response.razorpay_payment_id})
        placeOrderFunc();
      },
      prefill: {
        name: loggedUserData?.firstName || "Guest User",
        email: loggedUserData?.email || "guest@example.com",
        contact: loggedUserData?.phone || "0987654321",
      },
      theme: {
        color: "#DC2F21",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <Navbar />
      <div className="container py-4 my-5" style={{ fontFamily: "poppins" }}>
        <h2>Checkout</h2>
        <div className="row">
          <div className="col-7">
            <div className="border rounded p-4 my-4">
              {loggedUserData?._id ? (
                <div className="border rounded p-3 mb-4">
                  <div className="d-flex justify-content-between align-items-center mx-2 mb-2">
                    <h4 className="mb-0">Delivery Address</h4>
                    {addresses?.length > 1 && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                        style={{ height: "15px", opacity: "0.6" }}
                      />
                    )}
                  </div>

                  <div className="row m-0 p-0">
                    <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control"
                        placeholder="Enter Full Name"
                        value={addressForm?.fullName}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            fullName: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Enter Phone"
                        value={addressForm?.phone}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            phone: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>

                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Enter Alternative Phone"
                        value={addressForm?.alternatePhone}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            alternatePhone: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                      <textarea
                        className="form-control "
                        placeholder="Area"
                        value={addressForm?.area}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            area: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>

                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Landmark"
                        value={addressForm?.landmark}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            landmark: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Pincode"
                        value={addressForm?.pincode}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            pincode: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="City"
                        value={addressForm?.city}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="State"
                        value={addressForm?.state}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            state: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Country"
                        value={addressForm?.country}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            country: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="mx-1">
                      {!editAddress && (
                        <button
                          onClick={() => setEditAddress(true)}
                          className="btn btn-secondary w-100  mt-2"
                        >
                          Edit Address
                        </button>
                      )}
                    </div>
                    <div className="mx-1">
                      {addressForm?.fullName &&
                      addressForm?.phone &&
                      addressForm?.area &&
                      addressForm?.pincode &&
                      addressForm?.landmark ? (
                        <button className="btn btn-success w-100  mt-2">
                          Save as delivery address
                        </button>
                      ) : (
                        <button
                          className="btn btn-success w-100  mt-2"
                          style={{ opacity: "0.5" }}
                        >
                          Save as delivery address
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border p-4 mb-4">
                  <h4>Please Verify your phone number</h4>
                  <input
                    value={userFormData.phone}
                    className="form-control mb-3"
                    placeholder="Enter number"
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                  {showPhoneInput && (
                    <input
                      value={userFormData?.phoneOtp}
                      className="form-control mt-2"
                      placeholder="Enter OTP"
                      style={{ height: "45px" }}
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          phoneOtp: e.target.value,
                        })
                      }
                    />
                  )}
                  {showPhoneInput ? (
                    <button
                      className="btn btn-success w-100  mt-3"
                      onClick={() => otpVerifyFunc()}
                    >
                      Verify OTP
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary w-100  mt-2"
                      onClick={() => sendOtpFunc()}
                    >
                      Send OTP
                    </button>
                  )}
                </div>
              )}

              <h5>
                Total Products:{" "}
                {cartList?.reduce((total, item) => total + item.quantity, 0)}
              </h5>
              <h5>
                Subtotal: ₹
                {cartList?.reduce(
                  (total, item) => total + item.discountedPrice * item.quantity,
                  0
                )}
              </h5>
              <button
                className="btn btn-warning w-100 mt-3"
                onClick={initiatePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
          <div className="col-5">
            <div style={{ fontFamily: "poppins" }}>
              <div className="offcanvas-header">
                <h5>
                  Your Cart (
                  {cartList?.reduce(
                    (total, item) => total + (item.quantity || 0),
                    0
                  )}{" "}
                  Products)
                </h5>
                {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button> */}
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
                      <h6>
                        {item.name} : {item?.quantity}
                      </h6>

                      <p className="text-muted mt-1">
                        <del>₹{item?.price}</del> (₹{item?.discountedPrice}*
                        {item?.quantity})
                      </p>
                    </div>
                  </div>
                ))}

                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
