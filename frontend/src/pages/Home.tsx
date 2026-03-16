import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] overflow-hidden">
        <section className="relative h-full bg-accent flex items-center">
          <div className="absolute inset-0 z-0 opacity-30">
             <div className="absolute inset-0 bg-gradient-to-r from-accent to-maroon/40"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-20">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-maroon text-gold text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 shadow-xl shadow-black/20">
                Official Batch 2026 Portal
              </span>
              <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] mb-10 tracking-tighter uppercase">
                Graduation <br />
                <span className="text-gold italic">Finds</span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed font-medium max-w-xl">
                The exclusive pre-order system for your academic regalia and heritage items. Reserve your slot today for on-campus pickup.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="px-12 py-6 bg-gold text-maroon font-black rounded-full hover:scale-105 hover:bg-white transition-all duration-500 flex items-center gap-4 shadow-[0_20px_50px_rgba(212,175,55,0.3)] group text-lg">
                  Shop Collection 
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-[-10%] bottom-[-5%] opacity-10 pointer-events-none select-none">
            <GraduationCap className="h-[600px] w-[600px] text-white" />
          </div>

          {/* Featured Stats Static */}
          <div className="absolute bottom-0 inset-x-0 bg-white/5 backdrop-blur-md border-t border-white/10 py-8 hidden md:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-4 gap-8">
                {[
                  { label: "School Pickup", sub: "Liceo Campus" },
                  { label: "Pre-order Only", sub: "Batch 2026" },
                  { label: "Official Gear", sub: "Standardized" },
                  { label: "Student Guard", sub: "Secure Login" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 border-r border-white/10 last:border-0 pl-4 first:pl-0">
                    <div className="h-1 w-6 bg-gold rounded-full"></div>
                    <div>
                      <p className="text-gold font-black text-[10px] uppercase tracking-widest leading-none">{stat.label}</p>
                      <p className="text-white/40 text-[10px] font-bold mt-1 uppercase tracking-tight">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}