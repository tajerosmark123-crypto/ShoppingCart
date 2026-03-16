import { useState, useEffect } from 'react';
import { productApi, type Product } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getAll()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data as any).results || [];
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 border-4 border-maroon border-t-gold rounded-full animate-spin"></div>
          <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] animate-pulse">Accessing Inventory...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-l-4 border-maroon pl-8">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black text-accent mb-2 tracking-tighter uppercase leading-none">Student Inventory</h1>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Select Batch Requisites</p>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">View and reserve your official graduation items. All items are authenticated for Batch 2026.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map(product => (
            <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4 md:p-6 flex-grow flex flex-col">
                <h3 className="text-xs md:text-sm font-black text-maroon tracking-tight leading-tight uppercase line-clamp-2 mb-4 h-8 md:h-10">
                  {product.name}
                </h3>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-sm md:text-lg font-black text-accent tracking-tighter">
                    ₱{parseFloat(product.base_price || "0").toLocaleString()}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-accent text-white rounded-xl hover:bg-maroon transition-all duration-300 shadow-lg shadow-accent/10"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
