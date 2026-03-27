import React from 'react';
import { FiDollarSign, FiUsers, FiShoppingBag, FiActivity } from 'react-icons/fi';

function AdminDashboard() {
  const stats = [
    { name: 'Total Revenue', value: '$45,231.89', icon: <FiDollarSign className="w-6 h-6" />, change: '+20.1%', changeType: 'positive' },
    { name: 'Active Users', value: '+2350', icon: <FiUsers className="w-6 h-6" />, change: '+180.1%', changeType: 'positive' },
    { name: 'Total Orders', value: '+12,234', icon: <FiShoppingBag className="w-6 h-6" />, change: '+19%', changeType: 'positive' },
    { name: 'Active Subscriptions', value: '+573', icon: <FiActivity className="w-6 h-6" />, change: '+201 since last hour', changeType: 'neutral' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200">
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                {stat.icon}
              </div>
              {stat.changeType === 'positive' && (
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
              )}
              {stat.changeType === 'negative' && (
                <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">{stat.change}</span>
              )}
              {stat.changeType === 'neutral' && (
                <span className="text-sm font-medium text-gray-500">{stat.change}</span>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-100">
           <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
               <span className="text-gray-400 font-medium">Revenue Chart Placeholder</span>
           </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 mr-3 flex items-center justify-center text-gray-600 font-medium">{i}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">User {i}</p>
                    <p className="text-xs text-gray-500">user{i}@example.com</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-900">+$2{i}9.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
