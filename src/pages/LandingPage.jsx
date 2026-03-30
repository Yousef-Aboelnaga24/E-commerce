import { useState, useEffect } from 'react';
import { getProducts } from '../services/api/Products';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, []);

  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Products</h2>
          <p className="mt-4 text-xl text-gray-500">Handpicked selections to upgrade your lifestyle.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-600 py-16 mt-12 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe for Exclusive Offers</h2>
          <p className="mb-8">Join our newsletter to receive the best deals and latest updates.</p>
          <div className="max-w-md mx-auto flex">
            <input type="email" placeholder="Email Address" className="flex-1 py-3 px-4 rounded-l-lg text-white border-2 border-gray-900" />
            <button className="bg-gray-900 cursor-pointer hover:bg-black py-3 px-6 rounded-r-lg font-semibold transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
