import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import ProductFormModal from '../../components/modals/ProductFormModel';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../../services/api/Products';
import { getCategories } from '../../services/api/CategoryService';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCats();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      } catch (error) {
        let message = 'Something went wrong!';

        if (error.response && error.response.data) {
          message = error.response.data.message || JSON.stringify(error.response.data.errors);
        } else {
          message = error.message;
        }
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: message
        });
      }
    }
  };

  const handleSave = async (productData) => {
    try {
      let saved;
      if (editProduct) {
        saved = await updateProduct(editProduct.id, productData);
        setProducts(prev => prev.map(p => (p.id === editProduct.id ? saved.data : p)));
        Swal.fire('Updated!', 'Product has been updated successfully.', 'success');
      } else {
        saved = await createProduct(productData);
        setProducts(prev => [saved.data, ...prev]);
        Swal.fire('Created!', 'Product has been created successfully.', 'success');
      }
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      let message = 'Something went wrong!';
      if (error.response && error.response.data) {
        message = error.response.data.message || JSON.stringify(error.response.data.errors);
      }
      Swal.fire('Error', message, 'error');
    }
  };

  const filteredProducts = products.filter(p => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'All' || p.categoryName === selectedCategory)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products Management</h1>
        <button
          onClick={() => { setEditProduct(null); setModalOpen(true); }}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors duration-200"
        >
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
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 text-sm">
            <span className="text-gray-500 self-center">Category:</span>
            <select
              className="border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option>All</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
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
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4">No products found.</td></tr>
              ) : filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-gray-200 mr-3 overflow-hidden shrink-0 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "IMG"
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">{product.categoryName}</td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{product.price}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{product.stock}</td>
                  <td className="py-4 px-6 text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                      title="Edit"
                      onClick={() => { setEditProduct(product); setModalOpen(true); }}
                    >
                      <FiEdit2 className="w-5 h-5 inline" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      <FiTrash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        product={editProduct}
      />
    </div>
  );
}

export default AdminProducts;