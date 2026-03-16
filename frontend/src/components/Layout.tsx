import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, GraduationCap, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { cart } = useCart();
  const { addToast } = useToast();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = cart?.items?.length || 0;
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('cartId');
    addToast('You have been logged out', 'info');
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      {/* Top Bar / Announcement */}
      <div className="bg-maroon text-white py-2 px-4 text-center text-sm font-medium tracking-wide">
        CELEBRATING GRADUATION 2026 • PREMIUM QUALITY APPAREL
      </div>

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-maroon p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-6 w-6 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-maroon tracking-tighter leading-none">GRAD<span className="text-gold">CART</span></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Official Store</span>
              </div>
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-8">
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-maroon transition-colors">Inventory</Link>
                  <Link to="/cart" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-maroon transition-colors">Reservation</Link>
                </>
              )}
            </nav>

            <div className="flex items-center gap-4">
              {isAuthenticated && (
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-600 hover:text-maroon transition-colors group"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-maroon text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in duration-300">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              )}
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-white font-black text-[10px] uppercase tracking-widest hover:bg-maroon hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-maroon transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && isAuthenticated && (
            <div className="md:hidden pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Link
                to="/dashboard"
                className="block px-4 py-3 text-sm font-bold text-maroon bg-gray-50 rounded-lg hover:bg-maroon hover:text-white transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inventory
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-3 text-sm font-bold text-maroon bg-gray-50 rounded-lg hover:bg-maroon hover:text-white transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reservation ({cartItemCount})
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-bold text-white bg-accent rounded-lg hover:bg-maroon transition-all"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="bg-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-8 w-8 text-gold" />
                <span className="text-2xl font-black tracking-tighter">GRAD<span className="text-gold">CART</span></span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Empowering graduates with premium apparel and accessories for their monumental day. Quality craftsmanship for a lifetime of memories.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-[10px]">Portal Access</h4>
              <ul className="space-y-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <li><Link to="/dashboard" className="hover:text-gold transition-colors">Inventory Dashboard</Link></li>
                <li><Link to="/cart" className="hover:text-gold transition-colors">My Reservation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-gold uppercase tracking-widest text-[10px]">Support</h4>
              <ul className="space-y-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <li><button className="hover:text-gold transition-colors">Contact Us</button></li>
                <li><button className="hover:text-gold transition-colors">Shipping Policy</button></li>
                <li><button className="hover:text-gold transition-colors">Returns & Exchanges</button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <p>© 2026 GRADCART. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
