import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getCategories } from '../../services/api/CategoryService';

export default function ProductFormModal({ isOpen, onClose, onSave, product }) {
  const [form, setForm] = useState({
    image: null,
    preview: null,
    name: '',
    price: '',
    stock: "",
    category_id: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm(prev => ({
        ...prev,
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || 0,
        category_id: product.category_id || '',
        description: product.description || '',
        preview: product.image
          ? `http://127.0.0.1:8000/storage/${product.image}`
          : null
      }));
    }
  }, [product]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setForm(prev => ({
        ...prev,
        image: file,
        preview: file ? URL.createObjectURL(file) : null
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category_id || !form.stock) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (form[key] && key !== 'preview') {
          formData.append(key, form[key]);
        }
      });

      await onSave(formData);
      Swal.fire('Success', 'Product saved successfully!', 'success');
      onClose();
    } catch (error) {
      Swal.fire('Error', 'Something went wrong!', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-scaleIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Preview */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center">
              {form.preview ? (
                <img src={form.preview} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </div>
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm border rounded-lg px-3 py-2 file:mr-3 file:px-3 file:py-1 file:bg-blue-600 file:text-white file:border-0 file:rounded-lg cursor-pointer"
          />

          {/* Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}