import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import InputField from '../ui/InputField';
import { getCategories } from '../../services/api/CategoryService';

export default function ProductFormModal({ isOpen, onClose, onSave, product }) {
  const initialState = {
    image: null,
    preview: null,
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
  };

  const [form, setForm] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🟢 تعبئة البيانات عند التعديل
  useEffect(() => {
    if (product) {
      setForm({
        image: null,
        preview: product.image
          ? `https://cartify.free.laravel.cloud/storage/${product.image}`
          : null,
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        category_id: product.category_id || "",
        description: product.description || "",
      });
    } else {
      setForm(initialState);
    }
  }, [product, isOpen]);

  // 🟢 جلب التصنيفات
  useEffect(() => {
    if (isOpen) {
      getCategories().then(setCategories).catch(console.error);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      if (file) {
        setForm(prev => ({
          ...prev,
          image: file,
          preview: URL.createObjectURL(file)
        }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    return () => {
      if (form.preview && form.image) {
        URL.revokeObjectURL(form.preview);
      }
    };
  }, [form.preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price || !form.category_id || !form.stock) {
      Swal.fire('Error', 'Please fill all required fields', 'error');
      return;
    }

    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      Swal.fire('Error', 'Price and Stock cannot be negative', 'error');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // إضافة البيانات لـ FormData
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('stock', form.stock);
      formData.append('category_id', form.category_id);
      formData.append('description', form.description);

      if (form.image) {
        formData.append('image', form.image);
      }

      await onSave(formData);

      Swal.fire('Success', 'Product saved successfully!', 'success');
      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong!', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? 'Edit Product' : 'Add Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Preview Area */}
          <div className="flex flex-col items-center gap-2 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center">
              {form.preview ? (
                <img src={form.preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>

            <input
              key={form.preview ? 'has-image' : 'no-image'} // لضمان إعادة ضبط المدخل عند حذف الصورة
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />

            {form.preview && (
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, image: null, preview: null }))}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Inputs using your Custom Component */}
          <InputField
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <InputField
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full"
              min="0"
            />
            <InputField
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full"
              min="0"
            />
          </div>

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description (Optional)"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white text-sm font-medium shadow-md transition-all ${loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-95"
                }`}
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}