"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/Layout';
import { MOCK_VENDORS, MOCK_CATEGORIES } from '@/lib/data';
import { Star, Clock, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function Stores() {
  const [activeCategory, setActiveCategory] = useState('All');

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
    <MainLayout title="All Stores">
      <div className="bg-white pt-4 pb-2 px-4 sticky top-16 z-10 shadow-sm border-b border-gray-100">
         <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-2xl border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6 bg-gray-50 font-medium"
            placeholder="Search stores..."
          />
        </div>
        
        <div className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4 hidden-scrollbar" style={{ scrollbarWidth: 'none' }}>
          <button 
            onClick={() => setActiveCategory('All')}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm ${activeCategory === 'All' ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            All
          </button>
          {MOCK_CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-1 ${activeCategory === cat.name ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 pb-24">
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {MOCK_VENDORS.filter(v => activeCategory === 'All' || v.tags.includes(activeCategory)).map((vendor) => (
            <motion.div variants={item} key={vendor.id}>
              <Link href={`/vendor/${vendor.id}`} className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
                <div className="h-48 w-full relative">
                  <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
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
    </MainLayout>
  );
}
