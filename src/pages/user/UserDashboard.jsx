import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserSidebar from '../../components/user/UserSidebar';
import { FaShoppingBag, FaUser, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { getOrders } from '../../services/api/Order';

const UserDashboard = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        // Assume data is sorted by date or take top 5
        setRecentOrders(data.slice(0, 5) || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentOrders();
  }, []);

  const stats = [
    { name: 'Total Orders', value: recentOrders.length, icon: <FaShoppingBag />, color: 'bg-blue-50 text-blue-600' },
    { name: 'Latest Order Status', value: recentOrders[0]?.status || 'N/A', icon: <FaUser />, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <UserSidebar />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8 animate-fade-in">
          {/* Header */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 font-medium">
                <span className="flex items-center gap-2">
                  <FaEnvelope size={14} /> {user?.email}
                </span>
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt size={14} /> Cairo, Egypt
                </span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md shadow-blue-200 transition-all duration-200">
              Edit Profile
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-all hover:shadow-md">
                <div className={`p-4 rounded-xl ${stat.color} text-2xl`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 uppercase">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              <button className="text-blue-600 font-semibold hover:text-blue-700">View All</button>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Order ID</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loading ? (
                      <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                    ) : recentOrders.length === 0 ? (
                      <tr><td colSpan="4" className="px-6 py-4 text-center">No recent orders.</td></tr>
                    ) : recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                        <td className="px-6 py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            order.status === 'Completed' || order.status === 'Delivered'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">${Number(order.totalPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
