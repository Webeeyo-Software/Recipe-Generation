"use client";

import React, { useState, useEffect } from "react";
import { ref, set, onValue, remove, update, off } from "firebase/database";
import { database } from "../firebaseConfig"; 
import useAuth from "../auth/AuthProvider";
import Sidebar from "../components/sidebar";
import ClientModal from "../components/clientModal"; 

const Clients = () => {
  const { user, loading } = useAuth();
  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    if (!user) return;

    const clientsRef = ref(database, "clients/");
    const unsubscribe = onValue(clientsRef, (snapshot) => {
      const data = snapshot.val();
      const clientList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setClients(clientList);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddOrUpdateClient = (client) => {
    if (client.id) {
      update(ref(database, "clients/" + client.id), client);
    } else {
      const newClientId = `client_${Date.now()}`;
      set(ref(database, "clients/" + newClientId), client);
    }
    setModalOpen(false);
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentClient(null);
    setModalOpen(true);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex bg-[#f2f2f2] h-full min-h-[100vh]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="bg-white px-4 py-4 drop-shadow flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800">All Clients</h1>
          <button
            onClick={handleAddNew}
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add New
          </button>
        </div>
        <ClientModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddOrUpdateClient}
          initialData={currentClient}
        />
        <div className="px-4 py-5 sm:px-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Sr No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Total Received Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client, index) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.Name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${client.recivedAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleEdit(client)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteClient(client.id)}
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
};

export default Clients;
