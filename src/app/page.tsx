"use client";
import Link from 'next/link';
import { MainLayout } from '@/components/Layout';
import { MOCK_BANNERS, MOCK_CATEGORIES, MOCK_VENDORS, MOCK_MENU } from '@/lib/data';
import { Search, MapPin, Clock, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 300, damping: 24 } }
  };

  return (
    <MainLayout noHeader>
      {/* Top Header Section */}
      <div className="bg-white pt-10 pb-4 px-4 sticky top-0 z-10 shadow-sm md:shadow-none">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Delivering to</p>
            <div className="flex items-center space-x-1">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Computer Science South...</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=User&background=random" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-2xl border-0 py-3.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 bg-gray-50 font-medium"
            placeholder="Search meals or vendors..."
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 py-2 space-y-8 mt-2 md:mt-0"
      >
        
        {/* Promotional Banners */}
        <div className="flex overflow-x-auto space-x-4 pb-2 snap-x -mx-4 px-4 hidden-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {MOCK_BANNERS.map((banner) => (
            <div key={banner.id} className={`snap-center shrink-0 w-[85%] md:w-80 h-40 rounded-3xl overflow-hidden relative shadow-sm ${banner.color}`}>
              <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-white font-extrabold text-2xl leading-tight w-3/4 shadow-sm">{banner.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          {MOCK_CATEGORIES.map((cat) => (
             <button key={cat.id} className="flex flex-col items-center space-y-2 flex-shrink-0 group">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-2xl group-hover:bg-red-50 group-hover:border-red-100 group-hover:shadow-md group-active:scale-95 transition-all">
                  {cat.icon}
                </div>
                <span className="text-sm font-bold text-gray-700">{cat.name}</span>
             </button>
          ))}
        </div>

        {/* Quick Reorder */}
        <div className="space-y-3">
          <h2 className="text-xl font-extrabold tracking-tight">Order Again</h2>
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4">
             <img src={MOCK_MENU[0].image} alt="Burger" className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
             <div className="flex-1">
               <h4 className="font-bold text-gray-900">{MOCK_MENU[0].name}</h4>
               <p className="text-sm text-gray-500 font-medium">Campus Grill</p>
             </div>
             <button className="bg-gray-100 p-3 rounded-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 hover:bg-gray-200">
               Reorder
             </button>
          </div>
        </div>

        {/* Nearby Vendors */}
        <div className="space-y-4 pb-8">
          <h2 className="text-xl font-extrabold tracking-tight">Nearby Vendors</h2>
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_VENDORS.map((vendor) => (
              <motion.div variants={item} key={vendor.id}>
                <Link href={`/vendor/${vendor.id}`} className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] hover:shadow-lg hover:border-red-200 transition-all group">
                <div className="h-48 w-full relative overflow-hidden">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                    <span className="text-sm font-bold">{vendor.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-extrabold text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">{vendor.tags.join(' • ')}</p>
                  
                  <div className="flex items-center space-x-4 mt-4 text-sm font-bold text-gray-700">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{vendor.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px]">💰</div>
                      <span>Min ${vendor.minOrder}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
