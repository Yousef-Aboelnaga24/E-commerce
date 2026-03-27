import React from 'react';
import { FiEye, FiSearch, FiFilter } from 'react-icons/fi';

function AdminOrders() {
  const orders = [
    { id: '#ORD-7352', customer: 'John Doe', date: 'Oct 24, 2023', amount: '$129.00', status: 'Completed', items: 2 },
    { id: '#ORD-7353', customer: 'Jane Smith', date: 'Oct 25, 2023', amount: '$45.50', status: 'Processing', items: 1 },
    { id: '#ORD-7354', customer: 'Robert Johnson', date: 'Oct 26, 2023', amount: '$299.99', status: 'Shipped', items: 1 },
    { id: '#ORD-7355', customer: 'Emily Davis', date: 'Oct 27, 2023', amount: '$89.00', status: 'Pending', items: 3 },
    { id: '#ORD-7356', customer: 'Michael Wilson', date: 'Oct 27, 2023', amount: '$150.25', status: 'Cancelled', items: 4 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Orders Management</h1>
        <button className="flex items-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200">
          <FiFilter className="mr-2" /> Export
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-80 text-sm"
            />
          </div>
          <div className="flex space-x-2 text-sm">
            <span className="text-gray-500 self-center">Status:</span>
            <select className="border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option>All Orders</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-blue-600">{order.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{order.customer}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{order.date}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{order.items}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">{order.amount}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Processing' || order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-blue-600 transition-colors" title="View Details">
                      <FiEye className="w-5 h-5 inline" />
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

export default AdminOrders;
