import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { getProduct } from '../services/api/Products';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-24 text-2xl font-bold">Product not found.</div>;
  }

  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    Swal.fire({
      title: 'Added to Cart',
      text: `${product.title} has been added to your cart.`,
      icon: 'success',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NavLink to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium">
        <FaArrowLeft className="mr-2" /> Back to Products
      </NavLink>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 p-8 bg-gray-50 rounded-xl flex items-center justify-center relative">
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow hover:scale-110 transition-transform text-2xl z-10"
          >
            <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-300"} />
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain mix-blend-multiply"
            data-aos="zoom-in"
          />
        </div>

        <div className="md:w-1/2 flex flex-col pt-4" data-aos="fade-left">
          <div className="uppercase tracking-wide text-sm text-blue-600 font-bold mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {product.title}
          </h1>

          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 text-lg mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.round(product.rating?.rate || 0) ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">({product.rating?.count || 0} customer reviews)</span>
          </div>

          <div className="text-4xl font-black text-gray-900 mb-6">
            ${Number(product.price).toFixed(2)}
          </div>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed border-t border-b border-gray-100 py-6">
            {product.description}
          </p>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl font-bold text-lg flex justify-center items-center gap-3 transition-colors shadow-lg hover:shadow-blue-500/30"
            >
              <FaShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
