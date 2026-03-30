import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api/Products';
import { getCategories } from '../services/api/CategoryService';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const cats = await getCategories();
        setCategories(cats);

        const categoryObj = cats.find(cat => cat.name === categoryParam);
        const productsData = await getProducts(categoryObj?.id, searchParam);
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryParam, searchParam]);

  const getTitle = () => {
    if (searchParam) return `Search results for "${searchParam}"`;
    if (categoryParam) return categoryParam;
    return 'All Products';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8" data-aos="fade-in">
        <h1 className="text-3xl font-bold text-gray-900 capitalize">
          {getTitle()}
        </h1>
        <p className="mt-2 text-gray-500">
          Showing {products.length} {products.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
