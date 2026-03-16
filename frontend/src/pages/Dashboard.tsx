import { useState, useEffect } from 'react';
import { productApi, type Product } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    productApi.getAll()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data as any).results || [];
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

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
          <div className="text-right">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Showing <span className="text-maroon">{filteredProducts.length}</span> of <span className="text-maroon">{products.length}</span> items
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/10 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-maroon transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-gray-100">
            <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="h-10 w-10 text-gray-300" />
            </div>
            <h2 className="text-3xl font-black text-maroon mb-4 uppercase tracking-tight">No Products Found</h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">Try adjusting your search query or browse all items.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-maroon text-gold font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-maroon/20"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col animate-in fade-in slide-in-from-bottom-2">
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
                      className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-accent text-white rounded-xl hover:bg-maroon transition-all duration-300 shadow-lg shadow-accent/10 group-hover:scale-110"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}
