import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      addToast('Please fill in all fields', 'warning');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      localStorage.setItem('isAuthenticated', 'true');
      addToast('Welcome back! Redirecting to dashboard...', 'success');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      addToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-md relative">
          <Link 
            to="/" 
            className="absolute -top-16 left-0 flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest hover:text-maroon transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-maroon py-12 px-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <GraduationCap className="h-48 w-48 text-white" />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Welcome Back</h1>
                <p className="text-gold font-bold text-xs uppercase tracking-[0.2em]">Access your Legacy</p>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="name@school.edu"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 px-1">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                    <button 
                      type="button" 
                      className="text-[10px] font-black text-maroon uppercase tracking-widest hover:underline transition-colors"
                      onClick={() => addToast('Password reset feature coming soon', 'info')}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest hover:bg-maroon hover:shadow-2xl hover:shadow-maroon/30 transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-maroon font-black uppercase tracking-widest text-xs hover:underline ml-1">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
