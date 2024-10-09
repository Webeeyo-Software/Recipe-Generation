import React, { useState, useEffect } from "react";

const ClientModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  // Ensure initialData is always an object, even if null is passed
  const [clientData, setClientData] = useState({
    Name: "",
    email: "",
    phone: "",
    address: "",
    recivedAmount: "",
    ...initialData
  });

  useEffect(() => {
    // Reset clientData with initialData or an empty object if initialData is null
    setClientData({
      Name: "",
      email: "",
      phone: "",
      address: "",
      recivedAmount: "",
      ...(initialData || {})
    });
  }, [initialData]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(clientData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">{clientData.id ? "Edit Client" : "Add New Client"}</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            name="Name"
            value={clientData.Name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="email"
            value={clientData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="phone"
            value={clientData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="address"
            value={clientData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="recivedAmount"
            value={clientData.recivedAmount}
            onChange={handleChange}
            placeholder="Received Amount"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
