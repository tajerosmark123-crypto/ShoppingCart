import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { type Order } from '../services/api';
import { CheckCircle, ArrowRight, Printer, Share2, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout';

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/orders/${id}/`)
      .then((res: { data: Order }) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error('Failed to load order:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 border-4 border-maroon border-t-gold rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Tracking your reservation...</p>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl font-black text-maroon mb-2 uppercase">Order Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md">We couldn't locate details for this order number.</p>
          <Link to="/" className="px-8 py-3 bg-maroon text-gold font-bold rounded-full hover:scale-105 transition-transform">
            Return Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-maroon py-16 px-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 flex items-center justify-center">
               <GraduationCap className="h-64 w-64 text-white" />
             </div>
             <div className="relative z-10">
               <div className="bg-gold/20 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                 <CheckCircle className="h-10 w-10 text-gold" />
               </div>
               <h1 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Order Confirmed!</h1>
               <p className="text-gold font-bold tracking-[0.2em] uppercase text-xs">Thank you for choosing GradCart</p>
             </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap justify-between items-center gap-6 pb-8 border-b border-gray-100 mb-8">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Identifier</p>
                <p className="text-xl font-black text-maroon tracking-tight">#{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-[10px] font-black uppercase tracking-widest">
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold text-accent">
                  {new Date(order.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Base Requisite</span>
                <span className="text-accent">₱{parseFloat(String(order.subtotal)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Reservation Fee</span>
                <span className="text-accent">₱{parseFloat(String(order.tax)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Shipping</span>
                <span className="text-gold font-black underline decoration-2 underline-offset-4">FREE</span>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-maroon">Total Paid</span>
                <span className="text-4xl font-black tracking-tighter text-accent">₱{parseFloat(String(order.total)).toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/"
                className="flex items-center justify-center gap-3 py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest hover:bg-maroon transition-all duration-300 group"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-5 bg-gray-50 text-gray-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-5 bg-gray-50 text-gray-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-all">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gold/5 py-6 px-8 text-center border-t border-gold/10">
             <p className="text-[10px] font-black text-maroon/60 uppercase tracking-[0.3em] leading-relaxed">
               Present this digital receipt at the <span className="text-maroon">School Registrar Office</span> to collect your items.
             </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
