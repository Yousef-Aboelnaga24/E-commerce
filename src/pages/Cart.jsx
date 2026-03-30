import { useCart } from '../context/CartContext';
import { NavLink } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <NavLink to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-block">
          Start Shopping
        </NavLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-sm font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-3 flex items-center gap-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    >
                      <FaTrash />
                    </button>
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mix-blend-multiply rounded" />
                    <NavLink to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
                      {item.title}
                    </NavLink>
                  </div>

                  <div className="col-span-1 text-center hidden md:block text-gray-700">
                    ${Number(item.price).toFixed(2)}
                  </div>

                  <div className="col-span-1 flex justify-center items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <div className="col-span-1 text-right font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <NavLink to="/products" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                &larr; Continue Shopping
              </NavLink>
              <button
                onClick={clearCart}
                className="text-red-500 font-medium hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Estimate</span>
                <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <NavLink
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold transition-all shadow-md hover:shadow-blue-500/30"
            >
              Proceed to Checkout <FaArrowRight />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
