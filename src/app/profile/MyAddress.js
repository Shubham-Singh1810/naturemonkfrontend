// 'use client'

// import { useState , useContext} from 'react'
// import React from 'react'
// import { useEffect } from 'react';
// import { LoggedDataContext } from '../context/Context';
// import { addressCreate , addressList , addressDelete , addressUpdate} from '../services/address.service';

// const MyAddress = () => {
//     const { loggedUserData, updateLoggedUserData } = useContext(LoggedDataContext);

//   const [form, setForm] = useState({
//     phone: '',
//     alternatePhone: '',
//     landmark: '',
//     area: '',
//     city: '',
//     state: '',
//     pincode: '',
//     country: '',
//     fullName: '',
//     userId:loggedUserData?._id || ''
//   })

//   const [showForm, setShowForm] = useState(false)

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
   
//   }

// //   address create

//     const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await addressCreate(form)
//       console.log('Address created:', res)
//       alert("Address saved successfully ")
//       setShowForm(false)
//       setForm({
//         phone: '',
//         alternatePhone: '',
//         landmark: '',
//         area: '',
//         city: '',
//         state: '',
//         pincode: '',
//         country: '',
//         fullName: '',
//           type: '', 
//         userId: loggedUserData?._id || '' 
//       })
//       await fetchAddresses();

//     } catch (error) {
//       console.error("Error creating address:", error)
//       alert("Something went wrong ")
//     }
//   }

// //   address get

// const [addresses, setAddresses] = useState([]);

// useEffect(() => {
//   fetchAddresses();
// }, []);

// const fetchAddresses = async () => {
//   try {
//     const res = await addressList();
//     setAddresses(res?.data || []);
//   } catch (error) {
//     console.error("Error fetching addresses:", error);
//   }
// };

// // address delete

// const handleDelete = async (id) => {
//   try {
//     await addressDelete(id);
//     alert("Address deleted successfully");
//     await fetchAddresses(); // Refresh the list
//   } catch (error) {
//     console.error("Error deleting address:", error);
//     alert("Failed to delete address");
//   }
// };

// // address update
// const handleEdit = (address) => {
//   setEditingId(address._id);
//   setEditForm({ ...address });
// };

// const handleEditChange = (e) => {
//   setEditForm({ ...editForm, [e.target.name]: e.target.value });
// };


// const [editingId, setEditingId] = useState(null);
// const [editForm, setEditForm] = useState({});


// const handleUpdate = async () => {
//   try {
//     const { _id, createdAt, updatedAt, __v, ...sanitizedData } = editForm;
//     const payload = { ...sanitizedData, _id }; // Include _id here
//     await addressUpdate(payload); // Send to API
//     alert("Address updated successfully");
//     setEditingId(null);
//     setEditForm({});
//     await fetchAddresses();
//   } catch (error) {
//     console.error("Error updating address:", error);
//     alert("Failed to update address");
//   }
// };




//   return (
//     <div className='my-address'>
//       <h3>My Address</h3>

//    <div className='all-address d-flex gap-2 flex-wrap'>
//    {addresses.map((address) => (
//   <div key={address._id} className='address-card'>
//     {editingId === address._id ? (
//       <>
//         <input name="fullName" value={editForm.fullName} onChange={handleEditChange} />
//         <input name="phone" value={editForm.phone} onChange={handleEditChange} />
//         <input name="alternatePhone" value={editForm.alternatePhone} onChange={handleEditChange} />
//         <input name="landmark" value={editForm.landmark} onChange={handleEditChange} />
//         <input name="area" value={editForm.area} onChange={handleEditChange} />
//         <input name="city" value={editForm.city} onChange={handleEditChange} />
//         <input name="state" value={editForm.state} onChange={handleEditChange} />
//         <input name="pincode" value={editForm.pincode} onChange={handleEditChange} />
//         <input name="country" value={editForm.country} onChange={handleEditChange} />
//         <select name="type" value={editForm.type} onChange={handleEditChange}>
//           <option value="">Select Address Type</option>
//           <option value="Home">Home</option>
//           <option value="Work">Work</option>
//           <option value="Other">Other</option>
//         </select>

//         <div className='address-btns d-flex gap-2 mt-3'>
//           <button onClick={handleUpdate}>Save</button>
//           <button onClick={() => setEditingId(null)}>Cancel</button>
//         </div>
//       </>
//     ) : (
//       <>
//         <p className='address-name mb-0'>{address.fullName}</p>
//         <p className='address-phone mb-0'>{address.phone}</p>
//         <p className='address mb-0'>
//           {address.area}, {address.landmark}, {address.city}, {address.state}
//         </p>
//         <p className='pincode mb-0'>{address.pincode}</p>
//         <div className='address-btns d-flex gap-2 mt-3'>
//           <button onClick={() => handleEdit(address)}>Edit</button>
//           <button onClick={() => handleDelete(address._id)} className='remove-btn'>Remove</button>
//         </div>
//       </>
//     )}
//   </div>
// ))}


//    </div>

//       {showForm && (
//         <div className='address-form'>
//               <h3>Add new address</h3>
//           <form onSubmit={handleSubmit}>
//             <div className='d-flex gap-3'>
//               <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
//               <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
//             </div>
//             <div className='d-flex gap-3'>
//               <input name="alternatePhone" placeholder="Alternate Phone" value={form.alternatePhone} onChange={handleChange} />
//               <input name="landmark" placeholder="Landmark" value={form.landmark} onChange={handleChange} />
//             </div>
//             <div className='d-flex gap-3'>
//               <input name="area" placeholder="Area" value={form.area} onChange={handleChange} />
//               <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
//             </div>
//             <div className='d-flex gap-3'>
//               <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
//               <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
//             </div>
//             <div className='d-flex gap-3'>
//   <select name="type" value={form.type} onChange={handleChange}>
//     <option value="">Select Address Type</option>
//     <option value="Home">Home</option>
//     <option value="Work">Work</option>
//     <option value="Other">Other</option>
//   </select>
// </div>

//             <div>
//               <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
//             </div>
//             <button type="submit">Save</button>
//           </form>
//         </div>
//       )}

//       <div className='add-address' onClick={() => setShowForm(!showForm)} style={{ cursor: 'pointer' }}>
//         <div className='d-flex gap-2'>
//           <img src='https://cdn-icons-png.flaticon.com/128/4315/4315609.png' alt="Add" />
//           <p className='mb-0'>Add new address</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MyAddress


'use client'

import { useState , useContext} from 'react'
import React from 'react'
import { useEffect } from 'react';
import { LoggedDataContext } from '../context/Context';
import { addressCreate , addressList , addressDelete , addressUpdate} from '../services/address.service';
import { toast } from "react-toastify";


const MyAddress = () => {
    const { loggedUserData, updateLoggedUserData } = useContext(LoggedDataContext);

  const [form, setForm] = useState({
    phone: '',
    alternatePhone: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    fullName: '',
    userId:loggedUserData?._id || ''
  })

  const [showForm, setShowForm] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
   
  }

//   address create

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await addressCreate(form)
      console.log('Address created:', res)
     
      setShowForm(false)
      setForm({
        phone: '',
        alternatePhone: '',
        landmark: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        fullName: '',
          type: '', 
        userId: loggedUserData?._id || '' 
      })
      await fetchAddresses();
        toast.success(res.message);

    } catch (error) {
      console.error("Error creating address:", error)
     toast.error(error.response?.data?.message);
    }
  }

//   address get

const [addresses, setAddresses] = useState([]);

useEffect(() => {
  fetchAddresses();
}, []);

const fetchAddresses = async () => {
  try {
    const res = await addressList();
    setAddresses(res?.data || []);
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
};

// address delete

const handleDelete = async (id) => {
  try {
  const res =  await addressDelete(id);
   
    await fetchAddresses(); // Refresh the list
       toast.success(res.message);
  } catch (error) {
    console.error("Error deleting address:", error);
    toast.error(error.response?.data?.message);
  }
};

// address update
const handleEdit = (address) => {
  setEditingId(address._id);
  setEditForm({ ...address });
};

const handleEditChange = (e) => {
  setEditForm({ ...editForm, [e.target.name]: e.target.value });
};


const [editingId, setEditingId] = useState(null);
const [editForm, setEditForm] = useState({});


const handleUpdate = async () => {
  try {
    const { _id, createdAt, updatedAt, __v, ...sanitizedData } = editForm;
    const payload = { ...sanitizedData, _id }; // Include _id here
    await addressUpdate(payload); // Send to API
    alert("Address updated successfully");
    setEditingId(null);
    setEditForm({});
    await fetchAddresses();
  } catch (error) {
    console.error("Error updating address:", error);
    alert("Failed to update address");
  }
};




  return (
    <div className='my-address'>
      <h3>My Address</h3>

   <div className='all-address d-flex gap-2 flex-wrap'>
   {addresses.map((address) => (
  <div key={address._id} className='address-card'>
    {editingId === address._id ? (
      <>
        <input name="fullName" value={editForm.fullName} onChange={handleEditChange} />
        <input name="phone" value={editForm.phone} onChange={handleEditChange} />
        <input name="alternatePhone" value={editForm.alternatePhone} onChange={handleEditChange} />
        <input name="landmark" value={editForm.landmark} onChange={handleEditChange} />
        <input name="area" value={editForm.area} onChange={handleEditChange} />
        <input name="city" value={editForm.city} onChange={handleEditChange} />
        <input name="state" value={editForm.state} onChange={handleEditChange} />
        <input name="pincode" value={editForm.pincode} onChange={handleEditChange} />
        <input name="country" value={editForm.country} onChange={handleEditChange} />
        <select name="type" value={editForm.type} onChange={handleEditChange}>
          <option value="">Select Address Type</option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>

        <div className='address-btns d-flex gap-2 mt-3'>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      </>
    ) : (
      <>
        <p className='address-name mb-0'>{address.fullName}</p>
        <p className='address-phone mb-0'>{address.phone}</p>
        <p className='address mb-0'>
          {address.area}, {address.landmark}, {address.city}, {address.state}
        </p>
        <p className='pincode mb-0'>{address.pincode}</p>
        <div className='address-btns d-flex gap-2 mt-3'>
          <button onClick={() => handleEdit(address)}>Edit</button>
          <button onClick={() => handleDelete(address._id)} className='remove-btn'>Remove</button>
        </div>
      </>
    )}
  </div>
))}


   </div>

      {showForm && (
        <div className='address-form'>
              <h3>Add new address</h3>
          <form onSubmit={handleSubmit}>
            <div className='d-flex gap-3'>
              <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className='d-flex gap-3'>
              <input name="alternatePhone" placeholder="Alternate Phone" value={form.alternatePhone} onChange={handleChange} />
              <input name="landmark" placeholder="Landmark" value={form.landmark} onChange={handleChange} />
            </div>
            <div className='d-flex gap-3'>
              <input name="area" placeholder="Area" value={form.area} onChange={handleChange} />
              <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            </div>
            <div className='d-flex gap-3'>
              <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
              <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
            </div>
            <div className='d-flex gap-3'>
  <select name="type" value={form.type} onChange={handleChange}>
    <option value="">Select Address Type</option>
    <option value="Home">Home</option>
    <option value="Work">Work</option>
    <option value="Other">Other</option>
  </select>
</div>

            <div>
              <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      )}

      <div className='add-address' onClick={() => setShowForm(!showForm)} style={{ cursor: 'pointer' }}>
        <div className='d-flex gap-2'>
          <img src='https://cdn-icons-png.flaticon.com/128/10015/10015328.png' alt="Add" />
          <p className='mb-0'>Add new address</p>
        </div>
      </div>
    </div>
  )
}

export default MyAddress





