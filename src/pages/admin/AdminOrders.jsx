import React, { useState, useEffect } from 'react';
import { FiEye, FiSearch, FiFilter } from 'react-icons/fi';
import { getOrders } from '../../services/api/Order';
import Swal from 'sweetalert2';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Orders');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to fetch orders.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const term = search.toLowerCase();
    const matchesSearch = order.id.toString().includes(term) || 
                          (order.user?.name || '').toLowerCase().includes(term);
    const matchesStatus = statusFilter === 'All Orders' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 text-sm">
            <span className="text-gray-500 self-center">Status:</span>
            <select 
              className="border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
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
              {loading ? (
                <tr><td colSpan="7" className="text-center py-4 text-gray-500">Loading orders...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-4 text-gray-500">No orders found.</td></tr>
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-blue-600">#{order.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{order.user?.name || 'Guest'}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{order.items?.length || 0}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900">${Number(order.totalPrice).toFixed(2)}</td>
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
