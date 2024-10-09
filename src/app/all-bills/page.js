"use client"

import { useState } from "react";
import Sidebar from "../components/sidebar";
import useAuth from "../auth/AuthProvider";

const AddBillModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Add New Bill</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Client Name" className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" placeholder="Amount" className="w-full p-2 border border-gray-300 rounded" />
                    <input type="date" className="w-full p-2 border border-gray-300 rounded" />
                    <input type="time" className="w-full p-2 border border-gray-300 rounded" />
                    <div className="flex justify-between items-center">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Add Bill</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Bills = () => {
    const { user, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sampleData = [
        { id: 1, clientName: "John Doe", amount: "$200.00", date: "2022-09-01", time: "12:00", email: "john@example.com" },
        { id: 2, clientName: "Jane Smith", amount: "$150.00", date: "2022-09-02", time: "15:00", email: "jane@example.com" },
    ];

    if (loading) return <p>Loading...</p>;
    if (!user) return null;

    return (
        <div className="flex bg-[#f2f2f2] h-full min-h-[100vh]">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <div className="bg-white px-4 py-4 drop-shadow flex justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">All Bills</h1>
                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">Add New</button>
                </div>
                <AddBillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <div className="px-4 py-5 sm:px-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sr No
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Send Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sampleData.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.clientName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Send</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Edit</button>
                                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2">Delete</button>
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
