import React from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';

function AdminProducts() {
  const products = [
    { id: 1, name: 'Premium Wireless Headphones', price: '$299.99', stock: 45, category: 'Electronics', status: 'In Stock' },
    { id: 2, name: 'Ergonomic Office Chair', price: '$199.50', stock: 12, category: 'Furniture', status: 'Low Stock' },
    { id: 3, name: 'Mechanical Keyboard', price: '$129.00', stock: 0, category: 'Electronics', status: 'Out of Stock' },
    { id: 4, name: 'Smart Fitness Watch', price: '$149.99', stock: 89, category: 'Wearables', status: 'In Stock' },
    { id: 5, name: 'Stainless Steel Water Bottle', price: '$24.99', stock: 150, category: 'Accessories', status: 'In Stock' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products Management</h1>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200">
          <FiPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 w-64 text-sm"
            />
          </div>
          <div className="flex space-x-2 text-sm">
            <span className="text-gray-500 self-center">Category:</span>
            <select className="border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option>All</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Wearables</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gray-200 mr-3 overflow-hidden flex-shrink-0">
                         {/* Placeholder image */}
                         <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">IMG</div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{product.category}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.price}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{product.stock}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-800'
                          : product.status === 'Low Stock'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3 transition-colors" title="Edit">
                      <FiEdit2 className="w-5 h-5 inline" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                      <FiTrash2 className="w-5 h-5 inline" />
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

export default AdminProducts;
