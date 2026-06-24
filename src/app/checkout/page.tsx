"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/Layout';
import { MapPin, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const [method, setMethod] = useState('card');
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setPlaced(true);
    setTimeout(() => {
      router.push('/tracking/ord_123');
    }, 2000);
  };

  if (placed) {
    return (
       <MainLayout noHeader noBottomNav>
         <div className="flex flex-col items-center justify-center h-[80vh] px-6 text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order Placed!</h1>
            <p className="font-medium text-gray-500">Your food is being prepared by Campus Grill.</p>
         </div>
       </MainLayout>
    );
  }

  return (
    <MainLayout title="Checkout" backTo="/cart" noBottomNav>
      <div className="p-4 space-y-8 pb-32">
        
        {/* Address */}
        <section>
           <h2 className="text-xl font-extrabold tracking-tight mb-4">Delivery Address</h2>
           <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-start space-x-4">
              <div className="bg-red-50 p-3 rounded-full text-red-600 mt-1">
                 <MapPin className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="font-bold text-gray-900">Computer Science South Building</h3>
                 <p className="text-sm font-medium text-gray-500 mt-1">Room 402, 4th Floor. Call when outside.</p>
                 <button className="text-red-600 font-bold text-sm mt-3">Edit Details</button>
              </div>
           </div>
        </section>

        {/* Payment Methods */}
        <section>
           <h2 className="text-xl font-extrabold tracking-tight mb-4">Payment Method</h2>
           <div className="space-y-3">
              
              <label className={`flex items-center p-4 rounded-3xl border-2 cursor-pointer transition-colors ${method === 'card' ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-white hover:bg-gray-50'}`} onClick={() => setMethod('card')}>
                 <CreditCard className={`w-6 h-6 mr-4 ${method === 'card' ? 'text-red-600' : 'text-gray-400'}`} />
                 <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Credit Card</h3>
                    <p className="text-sm text-gray-500 font-medium">•••• 4242</p>
                 </div>
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${method === 'card' ? 'border-red-500' : 'border-gray-300'}`}>
                    {method === 'card' && <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full" />}
                 </div>
              </label>

              <label className={`flex items-center p-4 rounded-3xl border-2 cursor-pointer transition-colors ${method === 'wallet' ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-white hover:bg-gray-50'}`} onClick={() => setMethod('wallet')}>
                 <Wallet className={`w-6 h-6 mr-4 ${method === 'wallet' ? 'text-red-600' : 'text-gray-400'}`} />
                 <div className="flex-1">
                    <h3 className="font-bold text-gray-900">REDI Wallet</h3>
                    <p className="text-sm text-gray-500 font-medium">Balance: $45.00</p>
                 </div>
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${method === 'wallet' ? 'border-red-500' : 'border-gray-300'}`}>
                    {method === 'wallet' && <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full" />}
                 </div>
              </label>

           </div>
        </section>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
         <button onClick={handlePlaceOrder} className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full py-4 px-6 flex items-center justify-center font-extrabold text-lg shadow-lg shadow-red-500/30 active:scale-[0.98] transition-transform">
            Place Order • $20.48
         </button>
      </div>
    </MainLayout>
  );
}
