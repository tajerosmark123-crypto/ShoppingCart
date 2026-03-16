import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup logic
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
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
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-maroon py-12 px-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <GraduationCap className="h-48 w-48 text-white" />
              </div>
              <div className="relative z-10">
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Join GradCart</h1>
                <p className="text-gold font-bold text-xs uppercase tracking-[0.2em]">Start your Journey</p>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none transition-all font-medium"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none transition-all font-medium"
                      placeholder="name@school.edu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-maroon/20 focus:border-maroon outline-none transition-all font-medium"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 px-1 py-2">
                  <input type="checkbox" id="terms" required className="h-4 w-4 rounded border-gray-300 text-maroon accent-maroon" />
                  <label htmlFor="terms" className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">I agree to the Terms of Service</label>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-accent text-white rounded-2xl font-black uppercase tracking-widest hover:bg-maroon hover:shadow-2xl hover:shadow-maroon/30 transition-all duration-500 flex items-center justify-center gap-3 group"
                >
                  Create Account
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Already have an account?{' '}
                  <Link to="/login" className="text-maroon font-black uppercase tracking-widest text-xs hover:underline ml-1">
                    Sign In
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
