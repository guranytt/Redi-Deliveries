import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout';
import { MOCK_VENDORS, MOCK_MENU } from '@/lib/data';
import { Star, Clock, Info, ArrowLeft, Search, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Vendor() {
  const { id } = useParams();
  const vendor = MOCK_VENDORS.find(v => v.id === (id || 'v1')) || MOCK_VENDORS[0];
  const menuItems = MOCK_MENU.filter(m => m.vendorId === vendor.id);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <MainLayout noHeader noBottomNav>
      {/* Header Image & Back Button */}
      <div className="relative h-64 md:h-80 w-full">
        <Link to="/" className="absolute top-10 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-95">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <div className="absolute top-10 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-95">
          <Search className="w-5 h-5 text-gray-900" />
        </div>
        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Vendor Info Details */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-20 px-4 pt-6 pb-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{vendor.name}</h1>
        </div>
        
        <div className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
           <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" />
           <span>{vendor.rating} ({vendor.reviews}+ ratings)</span>
           <span className="text-gray-300">•</span>
           <span>{vendor.tags[0]}</span>
        </div>

        <div className="flex items-center justify-between border-t border-b border-gray-100 py-4 mb-4">
          <div className="flex flex-col items-center flex-1 border-r border-gray-100">
             <span className="text-gray-500 text-xs font-semibold mb-1">Delivery</span>
             <span className="font-extrabold text-gray-900 flex items-center"><Clock className="w-4 h-4 mr-1 text-gray-400"/> {vendor.deliveryTime}</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-gray-100">
             <span className="text-gray-500 text-xs font-semibold mb-1">Distance</span>
             <span className="font-extrabold text-gray-900">1.2 km</span>
          </div>
          <div className="flex flex-col items-center flex-1">
             <Info className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="px-4 py-2 sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-gray-100 hidden-scrollbar overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-6 pb-2">
          <button className="font-extrabold text-orange-600 border-b-2 border-orange-600 pb-2">Popular</button>
          <button className="font-bold text-gray-500 pb-2">Meals</button>
          <button className="font-bold text-gray-500 pb-2">Sides</button>
          <button className="font-bold text-gray-500 pb-2">Drinks</button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-6 bg-gray-50 pb-32">
        <h2 className="text-2xl font-extrabold tracking-tight mb-4">Popular</h2>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {menuItems.map(menuItem => (
          <motion.div variants={item} key={menuItem.id}>
          <Link to={`/product/${menuItem.id}`} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex h-36 relative active:scale-[0.98] transition-transform">
            <div className="flex-1 pr-4 flex flex-col justify-between">
               <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{menuItem.name}</h3>
                  <p className="text-sm text-gray-500 font-medium line-clamp-2 mt-1">{menuItem.description}</p>
               </div>
               <span className="font-extrabold text-lg">${menuItem.price.toFixed(2)}</span>
            </div>
            <div className="w-28 h-w-28 flex-shrink-0 relative">
               <img src={menuItem.image} alt={menuItem.name} className="w-full h-full object-cover rounded-2xl shadow-sm" />
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-50 text-orange-600">
                  <Plus className="w-6 h-6 stroke-w-2" />
               </div>
            </div>
          </Link>
          </motion.div>
        ))}
        </motion.div>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 md:hidden z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         <Link to="/cart" className="bg-orange-600 text-white rounded-full p-4 flex items-center justify-between shadow-lg font-extrabold active:scale-[0.98] transition-transform">
            <div className="flex items-center space-x-3">
               <div className="bg-orange-700/50 w-8 h-8 rounded-full flex items-center justify-center">2</div>
               <span>View cart</span>
            </div>
            <span>$17.49</span>
         </Link>
      </div>
    </MainLayout>
  );
}
