"use client";

import React, { useState, useEffect } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { database } from "./firebaseConfig";
import useAuth from "./auth/AuthProvider";
import Sidebar from "./components/sidebar";

export default function Home() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [bills, setBills] = useState([]);
  const [editingBill, setEditingBill] = useState(null);

  useEffect(() => {
    const clientsRef = ref(database, "clients/");
    onValue(clientsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedClients = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setClients(loadedClients);
    });

    const billsRef = ref(database, "bills/");
    onValue(billsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedBills = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .sort((a, b) => b.id - a.id)
        .slice(0, 10); // Sort by ID (assuming it's timestamp-based) and take the latest 10
      setBills(loadedBills);
    });
  }, []);

  const handleSaveBill = (billData) => {
    const billRef = ref(database, "bills/" + (billData.id || Date.now()));
    set(billRef, billData);
  };

  const handleDeleteBill = (billId) => {
    const billRef = ref(database, "bills/" + billId);
    remove(billRef);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex bg-[#f2f2f2] h-full min-h-[100vh]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="bg-blue-500 text-white rounded-lg p-4 shadow-lg">
            <h2 className="text-lg">Total Amount</h2>
            <p className="text-2xl">
              $
              {bills
                .reduce((acc, bill) => acc + parseFloat(bill.amount), 0)
                .toFixed(2)}
            </p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-4 shadow-lg">
            <h2 className="text-lg">Total Bills</h2>
            <p className="text-2xl">{bills.length}</p>
          </div>
          <div className="bg-red-500 text-white rounded-lg p-4 shadow-lg">
            <h2 className="text-lg">Total Clients</h2>
            <p className="text-2xl">{clients.length}</p>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6 flex-1 overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sr No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Mode
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill, index) => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.clientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${bill.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bill.paymentMode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* <button
                      onClick={() => {
                        setEditingBill(bill);
                        setIsModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDeleteBill(bill.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
