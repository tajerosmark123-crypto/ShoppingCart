import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productApi, type Product } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Star, Heart, Share2 } from 'lucide-react';
import Layout from '../components/Layout';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    if (!id) return;
    productApi.get(parseInt(id))
      .then(res => {
        setProduct(res.data);
        const defaults: Record<string, string> = {};
        res.data.attributes.forEach(attr => {
          if (attr.options.length > 0) {
            defaults[attr.name] = attr.options[0];
          }
        });
        setSelectedAttributes(defaults);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAttributeChange = (attrName: string, value: string) => {
    setSelectedAttributes(prev => ({ ...prev, [attrName]: value }));
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, selectedAttributes, quantity);
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 border-4 border-maroon border-t-gold rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading perfection...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="bg-gray-100 p-6 rounded-full mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-black text-maroon mb-2 uppercase">Product Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md">The item you're looking for might have been moved or is no longer available in our collection.</p>
          <Link to="/" className="px-8 py-3 bg-maroon text-gold font-bold rounded-full hover:scale-105 transition-transform">
            Back to Collection
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-maroon transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-maroon">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-maroon mb-12 uppercase tracking-widest transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Product Image Section */}
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-gray-50 rounded-[40px] overflow-hidden shadow-2xl relative group">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-8 right-8 flex flex-col gap-4">
                <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-maroon hover:text-white transition-all active:scale-95 text-gray-600">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-maroon hover:text-white transition-all active:scale-95 text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border-2 border-transparent hover:border-maroon transition-all cursor-pointer opacity-40 hover:opacity-100">
                  <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold rounded-full w-fit mb-6">
              <Star className="h-4 w-4" fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">Masterpiece Series</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-maroon mb-4 tracking-tight uppercase leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-8">
               <span className="text-3xl font-black text-accent">
                 ₱{parseFloat(String(product.base_price)).toLocaleString()}
               </span>
               <div className="h-8 w-[1px] bg-gray-200"></div>
               <div className="flex items-center gap-1.5 text-gold">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
                 ))}
                 <span className="ml-2 text-xs font-bold text-gray-400 uppercase tracking-widest">48 Reviews</span>
               </div>
            </div>

            <div className="prose prose-sm text-gray-500 mb-12 max-w-md leading-relaxed font-medium">
              <p>
                {product.description || 'Our finest academic regalia, meticulously crafted with premium materials for a distinguished graduation appearance.'}
              </p>
            </div>

            {/* Attributes */}
            {product.attributes.length > 0 && (
              <div className="space-y-10 mb-12">
                {product.attributes.map(attr => (
                  <div key={attr.id}>
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-xs font-black text-maroon uppercase tracking-[0.2em]">
                        {attr.name}
                      </label>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Selected: <span className="text-maroon">{selectedAttributes[attr.name] || 'None'}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {attr.options.map(option => (
                        <button
                          key={option}
                          onClick={() => handleAttributeChange(attr.name, option)}
                          className={`px-6 py-3 rounded-2xl border-2 font-bold text-sm tracking-tight transition-all duration-300 ${
                            selectedAttributes[attr.name] === option
                              ? 'border-maroon bg-maroon text-gold shadow-lg shadow-maroon/20 scale-105'
                              : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200 hover:text-gray-600'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mt-auto pt-10 border-t border-gray-100 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-maroon uppercase tracking-[0.2em]">Quantity</span>
                <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-maroon transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-accent">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="h-12 w-12 flex items-center justify-center text-gray-400 hover:text-maroon transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="w-full py-6 bg-accent text-white rounded-[24px] text-base font-black uppercase tracking-widest hover:bg-maroon hover:shadow-2xl hover:shadow-maroon/30 transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart className="h-5 w-5" />
                Reserve Item • ₱{(parseFloat(String(product.base_price)) * quantity).toLocaleString()}
              </button>
              
              <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Safe & Secure Checkout • Official Academic Quality
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
