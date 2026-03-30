import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createOrder } from '../services/api/Order';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createOrder(cartItems);
      clearCart();
      Swal.fire({
        title: 'Order Completed!',
        text: 'Your order has been placed successfully.',
        icon: 'success',
        confirmButtonText: 'Continue Shopping'
      }).then(() => {
        navigate('/products');
      });
    } catch (error) {
      console.error(error);
      let message = 'Failed to place order. Please try again.';
      if (error.response && error.response.data) {
        message = error.response.data.message || message;
      }
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="123 Main St" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="New York" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="10001" />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">Payment details</h2>
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-4 font-medium italic">This is a mock checkout. No real payment is required.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on card</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-white" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-white" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration date</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-white" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                    <input required type="text" className="w-full border border-gray-300 rounded-lg p-2.5 bg-white" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

            <div className="divide-y divide-gray-100 mb-4 max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-10 h-10 object-contain mr-3 mix-blend-multiply" />
                    <div>
                      <h4 className="text-xs font-medium text-gray-900 line-clamp-1 w-32">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-2 pt-2 border-t">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-lg font-bold transition-all shadow-md hover:shadow-blue-500/30 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                  Processing...
                </span>
              ) : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
