import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Trash2, CreditCard, Star, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout';

export default function Cart() {
  const { cart, removeFromCart, checkout, loading } = useCart();

  const handleCheckout = async () => {
    const result = await checkout();
    if (result) {
      window.location.href = `/order-confirmation/${result.orderId}`;
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <Layout>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-gray-100">
            <div className="bg-gray-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="h-10 w-10 text-gray-300" />
            </div>
            <h2 className="text-3xl font-black text-maroon mb-4 uppercase tracking-tight">Reservation is empty</h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">It seems you haven't reserved any graduation essentials yet. Your batch requisites await!</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 bg-maroon text-gold font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-maroon/20"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-black text-maroon mb-4 tracking-tighter uppercase">Reservation Cart</h1>
            <div className="h-1.5 w-24 bg-gold rounded-full"></div>
          </div>
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-maroon uppercase tracking-widest transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Add More Items
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map(item => (
              <div key={item.id} className="group bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-sm border border-gray-50 hover:shadow-xl hover:shadow-maroon/5 transition-all duration-500">
                <div className="w-full md:w-32 h-40 md:h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-maroon tracking-tight">{item.product.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(item.selected_attributes).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{key}</p>
                        <p className="text-sm font-bold text-accent">{value}</p>
                      </div>
                    ))}
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Quantity</p>
                      <p className="text-sm font-bold text-accent">{item.quantity}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Unit Price</span>
                    <span className="text-xl font-black text-accent">
                      ₱{parseFloat(String(item.price)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

            <div className="space-y-8">
              <div className="bg-accent rounded-3xl p-8 text-white shadow-2xl sticky top-32 z-50">
                <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-gold">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-400 uppercase tracking-widest">Items Subtotal</span>
                    <span>₱{parseFloat(String(cart.subtotal)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-400 uppercase tracking-widest">Reservation Fee</span>
                    <span>₱{parseFloat(String(cart.tax)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-400 uppercase tracking-widest">Pickup Fee</span>
                    <span className="text-gold font-black underline underline-offset-4 decoration-2">FREE</span>
                  </div>
                  <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">Total to Pay</span>
                    <span className="text-3xl font-black tracking-tighter">₱{(parseFloat(String(cart.subtotal)) + parseFloat(String(cart.tax))).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-5 bg-gold text-maroon rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
                >
                  <CreditCard className="h-5 w-5" />
                  Confirm Reservation
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
                   <GraduationCap className="h-4 w-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Official GradCart Secure</span>
                </div>
              </div>

              <div className="bg-maroon/5 rounded-3xl p-8 border border-maroon/10 relative z-10">
                 <div className="flex items-center gap-4 mb-4">
                 <div className="bg-gold p-2 rounded-lg">
                   <Star className="h-4 w-4 text-maroon" fill="currentColor" />
                 </div>
                 <h4 className="font-black text-maroon text-sm uppercase tracking-widest">Quality Guarantee</h4>
               </div>
               <p className="text-xs text-gray-500 leading-relaxed font-medium">
                 All our academic regalia meet strict institutional standards and are inspected for quality before shipment.
               </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
