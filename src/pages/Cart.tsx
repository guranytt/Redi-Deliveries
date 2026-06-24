import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/Layout';
import { MOCK_MENU } from '@/lib/data';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const [items, setItems] = useState([
    { id: 1, product: MOCK_MENU[0], quantity: 1 },
    { id: 2, product: MOCK_MENU[1], quantity: 2 },
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
  };

  return (
    <MainLayout title="Your Cart" backTo="/vendor/v1" noBottomNav>
      <div className="p-4 space-y-6 pb-40">
        
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex space-x-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
               <img src={item.product.image} className="w-20 h-20 rounded-2xl object-cover" alt="" />
               <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-extrabold text-gray-900 leading-tight">{item.product.name}</h3>
                    <p className="text-sm font-bold text-orange-600 mt-1">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                     <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1"><Minus className="w-4 h-4 text-gray-700" /></button>
                        <span className="font-bold w-3 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1"><Plus className="w-4 h-4 text-gray-700" /></button>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex space-x-2">
           <input type="text" placeholder="Promo code" className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 font-bold text-sm focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none" />
           <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-extrabold hover:bg-gray-800 transition-colors">Apply</button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3 font-medium text-gray-500">
           <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
           </div>
           <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-gray-900 font-bold">${deliveryFee.toFixed(2)}</span>
           </div>
           <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
              <span className="font-extrabold text-gray-900">Total</span>
              <span className="font-extrabold text-2xl text-gray-900">${total.toFixed(2)}</span>
           </div>
        </div>

      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-40 pb-safe md:relative md:border-none md:bg-transparent shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none">
         <Link to="/checkout" className="w-full bg-orange-600 text-white rounded-full py-4 px-6 flex items-center justify-between font-extrabold text-lg shadow-lg shadow-orange-600/30 active:scale-[0.98] transition-transform">
            <span>Checkout</span>
            <div className="flex items-center space-x-2">
               <span>${total.toFixed(2)}</span>
               <ArrowRight className="w-5 h-5" />
            </div>
         </Link>
      </div>
    </MainLayout>
  );
}
