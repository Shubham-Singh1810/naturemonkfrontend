// "use client";
// import React, { useState, useContext } from 'react';
// import { LoggedDataContext } from '../context/Context';

// const MyDetails = () => {
//       const { loggedUserData,  updateLoggedUserData } = useContext(LoggedDataContext); 

//   return (
//     <>
//       <div className="my-details">
//         <h3>My details</h3>

//      {/* personal info */}

//        <div className="personal-info">
//         <div className="d-flex gap-4">
//          <h5>Personal information</h5>
//        </div>
//        <div className='d-flex gap-2'>
//         <p className="name">{loggedUserData.firstName}</p>
//         <p className="name">{loggedUserData.lastName}</p>
//        </div>
          
//        </div>

//        {/* email address */}

//         <div className="personal-info">
//         <div className="d-flex gap-4">
//          <h5>Email Address</h5>
//        </div>
//        <div className='d-flex gap-2'>
//         <p className="name">{loggedUserData.email}</p>
//        </div>
          
//        </div>

//        {/* mobile */}

//         <div className="personal-info">
//         <div className="d-flex gap-4">
//          <h5>Phone Number</h5>
//        </div>
//        <div className='d-flex gap-2'>
//         <p className="name">{loggedUserData.phone}</p>
//        </div>
          
//        </div>

//        <div className='personal-info d-flex gap-2'>
//            <button className='change-password'>
//             Change password
//            </button>
//            <button className='change-password'>
//             Edit
//            </button>
//        </div>


//       </div>
//     </>
//   );
// };

// export default MyDetails;


"use client";
import React, { useState, useContext } from 'react';
import { LoggedDataContext } from '../context/Context';

const MyDetails = () => {
  const { loggedUserData, updateLoggedUserData } = useContext(LoggedDataContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: loggedUserData.firstName,
    lastName: loggedUserData.lastName,
    email: loggedUserData.email,
  });

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

  return (
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
  );
};

export default MyDetails;
