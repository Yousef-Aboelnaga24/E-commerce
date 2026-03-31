import React, { useState, useEffect } from 'react';
import UserSidebar from '../../components/user/UserSidebar';
import { FaEye, FaShoppingBag } from 'react-icons/fa';
import { getOrders } from '../../services/api/Order';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-50 text-green-600';
      case 'processing':
        return 'bg-blue-50 text-blue-600';
      case 'pending':
        return 'bg-yellow-50 text-yellow-600';
      case 'cancelled':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <UserSidebar />
        </div>

        {/* Main */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-1">Manage and track your purchases</p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                
                <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 text-center">Item</th>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Total</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-10">
                        Loading...
                      </td>
                    </tr>
                  ) : orders.map(order => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">

                      {/* Product Image */}
                      <td className="px-6 py-4 text-center">
                        {order.items?.[0]?.product?.image ? (
                          <img
                            src={order.items[0].product.image}
                            alt=""
                            className="w-12 h-12 object-cover rounded-xl mx-auto"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto">
                            <FaShoppingBag />
                          </div>
                        )}
                      </td>

                      {/* Order Info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold">{order.order_number}</p>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold">${Number(order.totalPrice).toFixed(2)}</p>
                        <p className="text-xs text-gray-400">{order.items?.length || 0} Items</p>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 hover:bg-blue-50 rounded">
                          <FaEye />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Empty State */}
            {!loading && orders.length === 0 && (
              <div className="py-20 text-center">
                <FaShoppingBag size={40} className="mx-auto text-gray-300 mb-4" />
                <h3 className="font-bold text-lg">No orders yet</h3>
                <p className="text-gray-500">Start shopping now 🚀</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;