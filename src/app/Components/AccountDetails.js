"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AccountDetails = () => {
  const [selectedSection, setSelectedSection] = useState("details");
  const router = useRouter();

  const menuItems = [
    { key: "details", label: "My details", icon: "https://cdn-icons-png.flaticon.com/128/1144/1144760.png", path: "/profile" },
    { key: "address", label: "My address book", icon: "https://cdn-icons-png.flaticon.com/128/535/535239.png", path: "/my-address" },
    { key: "orders", label: "My orders", icon: "https://cdn-icons-png.flaticon.com/128/1008/1008010.png", path: "/profile/orders" },
    { key: "cart", label: "My cart", icon: "https://cdn-icons-png.flaticon.com/128/2838/2838895.png", path: "/cart" },
    { key: "wishlist", label: "My wishlist", icon: "https://cdn-icons-png.flaticon.com/128/2767/2767018.png", path: "/wishlist" },
    { key: "logout", label: "Log out", icon: "https://cdn-icons-png.flaticon.com/128/10609/10609328.png", path: "/logout" },
  ];

  const handleClick = (item) => {
    setSelectedSection(item.key);
    router.push(item.path);  // navigate to the respective path
  };

  return (
    <div className="profile-left">
      {menuItems.map((item) => (
        <div
          key={item.key}
          className={`d-flex menu-item ${selectedSection === item.key ? "selected-detail" : ""}`}
          onClick={() => handleClick(item)}
          style={{ cursor: "pointer" }}
        >
          <img src={item.icon} className="profile-icons" alt={`${item.label} icon`} />
          <h5 className="mb-0">{item.label}</h5>
        </div>
      ))}
    </div>
  );
};

export default AccountDetails;
