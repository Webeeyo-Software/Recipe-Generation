"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import Image from "next/image";
import { database } from "../firebaseConfig";
import useAuth from "../auth/AuthProvider";
import Sidebar from "../components/sidebar";
import PrintIcon from "../assets/print.svg"; // Ensure the path to your Print icon is correct

const AddBillModal = ({ isOpen, onClose, clients, onSave, bill }) => {
  const [billData, setBillData] = useState({
    clientName: "",
    amount: "",
    date: "",
    time: "",
    paymentMode: "",
  });

  useEffect(() => {
    if (bill) {
      setBillData(bill);
    }
  }, [bill]);

  const handleChange = (event) => {
    setBillData({ ...billData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(billData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{bill ? "Edit Bill" : "Add New Bill"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <select name="clientName" value={billData.clientName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            {clients.map((client) => (
              <option key={client.id} value={client.name}>
                {client.name}
              </option>
            ))}
          </select>
          <input type="text" name="amount" placeholder="Amount" value={billData.amount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="date" name="date" value={billData.date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input type="time" name="time" value={billData.time} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <select name="paymentMode" value={billData.paymentMode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="Bank">Bank Transfer</option>
          </select>
          <div className="flex justify-between items-center">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">{bill ? "Update Bill" : "Add Bill"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PrintBillModal = ({ bill, isOpen, onClose }) => {
  if (!isOpen || !bill) return null;

  const printBill = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Bill Details</h2>
        <div className="mt-4">
          <p>Client Name: {bill.clientName}</p>
          <p>Amount: {bill.amount}</p>
          <p>Date: {bill.date}</p>
          <p>Time: {bill.time}</p>
          <p>Payment Mode: {bill.paymentMode}</p>
          <button onClick={printBill} className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Print Bill</button>
          <button onClick={onClose} className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Close</button>
        </div>
      </div>
    </div>
  );
};

const Bills = () => {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [currentBillForPrint, setCurrentBillForPrint] = useState(null);
  const [clients, setClients] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const clientsRef = ref(database, "clients/");
    onValue(clientsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setClients(Object.keys(data).map(key => ({ id: key, ...data[key] })));
    });

    const billsRef = ref(database, "bills/");
    onValue(billsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setBills(Object.keys(data).map(key => ({ id: key, ...data[key] })));
    });
  }, []);

  const handleSaveBill = (billData) => {
    const billRef = ref(database, "bills/" + (billData.id || Date.now()));
    set(billRef, billData);
  };

  const handleEditBill = (bill) => {
    setCurrentBillForPrint(bill);
    setIsModalOpen(true);
  };

  const handleDeleteBill = (billId) => {
    const billRef = ref(database, "bills/" + billId);
    remove(billRef);
  };

  const handlePrintBill = (bill) => {
    setCurrentBillForPrint(bill);
    setIsPrintModalOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex bg-[#f2f2f2] h-full min-h-[100vh]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="bg-white px-4 py-4 drop-shadow flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800">All Bills</h1>
          <button onClick={() => {
              setIsModalOpen(true);
              setEditingBill(null);
          }} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
            Add New
          </button>
        </div>
        <AddBillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} clients={clients} onSave={handleSaveBill} bill={currentBillForPrint} />
        <PrintBillModal bill={currentBillForPrint} isOpen={isPrintModalOpen} onClose={() => setIsPrintModalOpen(false)} />
        <div className="px-4 py-5 sm:px-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500_uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500_uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500_uppercase tracking-wider">Payment Mode</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500_uppercase tracking-wider">Print</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500_uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill, index) => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{bill.paymentMode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handlePrintBill(bill)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                      <Image src={PrintIcon} alt="Print" width={24} height={24} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleEditBill(bill)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Edit</button>
                    <button onClick={() => handleDeleteBill(bill.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bills;
