import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout';
import { MOCK_MENU } from '@/lib/data';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Product() {
  const { id } = useParams();
  const product = MOCK_MENU.find(m => m.id === (id || 'm1')) || MOCK_MENU[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <MainLayout noHeader noBottomNav>
      <div className="relative h-72 md:h-96 w-full bg-gray-100">
        <Link to={`/vendor/${product.vendorId}`} className="absolute top-10 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-95">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="bg-white rounded-t-3xl -mt-6 relative z-20 px-4 pt-8 pb-32 min-h-[50vh]">
         <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex-1 pr-4">{product.name}</h1>
            <span className="text-2xl font-extrabold">${product.price.toFixed(2)}</span>
         </div>
         
         <p className="text-gray-500 font-medium leading-relaxed">{product.description}</p>

         {/* Customizations */}
         <div className="mt-8 space-y-6">
            <div>
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-extrabold text-gray-900 text-lg">Choose Size</h3>
                 <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md">Required</span>
               </div>
               
               <label className="flex items-center justify-between p-4 border border-orange-600 bg-orange-50 rounded-2xl mb-3 cursor-pointer">
                  <div className="flex items-center space-x-3">
                     <div className="w-5 h-5 rounded-full border-4 border-orange-600 bg-white"></div>
                     <span className="font-bold text-gray-900">Regular</span>
                  </div>
                  <span className="text-sm font-bold text-gray-500">Free</span>
               </label>

               <label className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                     <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                     <span className="font-bold text-gray-900">Large</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">+$2.00</span>
               </label>
            </div>
         </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:hidden z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         <div className="flex items-center justify-between space-x-4 mb-4">
            <div className="flex items-center space-x-4 bg-gray-100 rounded-full px-4 py-3">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-900 p-1 active:scale-90"><Minus className="w-5 h-5" /></button>
               <span className="font-extrabold text-lg w-4 text-center">{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)} className="text-gray-900 p-1 active:scale-90"><Plus className="w-5 h-5" /></button>
            </div>
            
            <Link to="/cart" className="flex-1 bg-orange-600 text-white rounded-full py-4 text-center font-extrabold text-lg shadow-lg active:scale-[0.98] transition-transform">
               Add ${(product.price * quantity).toFixed(2)}
            </Link>
         </div>
      </div>
    </MainLayout>
  );
}
