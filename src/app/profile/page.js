
// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { LoggedDataContext } from "../context/Context";
// import Navbar from "../Components/Navbar";
// import MyDetails from "./MyDetails";
// import MyAddress from "./MyAddress";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const { loggedUserData , updateLoggedUserData  } = useContext(LoggedDataContext);
//   const router = useRouter();

//   const [selectedSection, setSelectedSection] = useState("details");

//   // logout 

//     useEffect(() => {
//     if (selectedSection === "logout") {
//       updateLoggedUserData(null); 
//       localStorage.removeItem("user"); 
//        toast.success("Logged out successfully!");
//       router.push("/login"); 
//     }
//   }, [selectedSection]);

//   useEffect(() => {
//     if (!loggedUserData) {
//       const timer = setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [loggedUserData, router]);

//   if (!loggedUserData) {
//     return (
//       <div className="loading-div">
//         <p>Loading user data...</p>
//       </div>
//     );
//   }

//   const renderSelectedComponent = () => {
//     switch (selectedSection) {
//       case "details":
//         return <MyDetails />;
//       case "address":
//         return <MyAddress/>;
//       case "orders":
//         return <p>Orders Component</p>;
//       case "cart":
//         return <p>Cart Component</p>;
//       case "wishlist":
//         return <p>Wishlist Component</p>;
//       default:
//         return <MyDetails />;
//     }
//   };

//   const menuItems = [
//     { key: "details", label: "My details", icon: "https://cdn-icons-png.flaticon.com/128/1144/1144760.png" },
//     { key: "address", label: "My address book", icon: "https://cdn-icons-png.flaticon.com/128/535/535239.png" },
//     { key: "orders", label: "My orders", icon: "https://cdn-icons-png.flaticon.com/128/1008/1008010.png" },
//     { key: "cart", label: "My cart", icon: "https://cdn-icons-png.flaticon.com/128/2838/2838895.png" },
//     { key: "wishlist", label: "My wishlist", icon: "https://cdn-icons-png.flaticon.com/128/2767/2767018.png" },
//     { key: "logout", label: "Log out", icon: "https://cdn-icons-png.flaticon.com/128/10609/10609328.png" },
//   ];

//   return (
//     <>
//       <Navbar />
//       <div className="user-profile">
//         <h2>My Account</h2>
//         <div className="profile-section d-flex gap-3">
          
//           {/* 🔵 Left Menu */}
//           <div className="profile-left">
//             {menuItems.map((item) => (
//               <div
//                 key={item.key}
//                 className={`d-flex  menu-item ${selectedSection === item.key ? "selected-detail" : ""}`}
//                 onClick={() => setSelectedSection(item.key)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img src={item.icon} className="profile-icons" />
//                 <h5 className="mb-0">{item.label}</h5>
//               </div>
//             ))}
//           </div>

//           {/* 🔵 Right Content */}
//           <div className="profile-right">{renderSelectedComponent()}</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;




"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/Context";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";
import AccountDetails from "../Components/AccountDetails";

const Profile = () => {
  const { loggedUserData , updateLoggedUserData  } = useContext(LoggedDataContext);
  const router = useRouter();

  const [selectedSection, setSelectedSection] = useState("details");

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
});


    useEffect(() => {
  if (loggedUserData) {
     setFormData({
      firstName: loggedUserData.firstName || "",
      lastName: loggedUserData.lastName || "",
      email: loggedUserData.email || "",
    });
  }
}, [loggedUserData]);


  // logout 

    useEffect(() => {
    if (selectedSection === "logout") {
      updateLoggedUserData(null); 
      localStorage.removeItem("user"); 
       toast.success("Logged out successfully!");
      router.push("/login"); 
    }
  }, [selectedSection]);

  useEffect(() => {
    if (!loggedUserData) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loggedUserData, router]);
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSave = () => {
      updateLoggedUserData({ ...loggedUserData, ...formData });
      setIsEditing(false);
    };

      if (!loggedUserData) {
    return (
      <div className="loading-div">
        <p>Loading user data...</p>
      </div>
    );
  }
 

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <h2>My Account</h2>
        <div className="profile-section d-flex gap-3">
          
          {/* 🔵 Left Menu */}
         <AccountDetails/>

          {/* 🔵 Right Content */}
          <div className="profile-right">
           <div className="my-details">
      <h3>My details</h3>

      {/* Personal Info */}
      <div className="personal-info">
        <h5>Personal Information</h5>
        <div className="d-flex gap-2">
          {isEditing ? (
            <>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="editable-input"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="editable-input"
              />
            </>
          ) : (
            <>
              <p className="name">{loggedUserData.firstName}</p>
              <p className="name">{loggedUserData.lastName}</p>
            </>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="personal-info">
        <h5>Email Address</h5>
        <div className="d-flex gap-2">
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="editable-input"
            />
          ) : (
            <p className="name">{loggedUserData.email}</p>
          )}
        </div>
      </div>

      {/* Phone Number (non-editable) */}
      <div className="personal-info">
        <h5>Phone Number</h5>
        <div className="d-flex gap-2">
          <p className="name">{loggedUserData.phone}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="personal-info d-flex gap-2">
        <button className="change-password">Change password</button>
        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
            </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default Profile;





