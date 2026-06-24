"use client";
import { MainLayout } from '@/components/Layout';
import { Plus, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function Wallet() {
  const transactions = [
    { id: 1, type: 'Credit', amount: 50.00, date: '12 Oct, 10:00 AM', title: 'Top Up' },
    { id: 2, type: 'Debit', amount: 19.49, date: '10 Oct, 14:30 PM', title: 'Order: Campus Grill' },
    { id: 3, type: 'Credit', amount: 10.00, date: '05 Oct, 09:12 AM', title: 'Refund' },
  ];

  return (
    <MainLayout title="Wallet">
      <div className="p-4 space-y-6">
         {/* Balance Card */}
         <div className="bg-gray-900 rounded-3xl p-6 shadow-lg text-white">
            <p className="text-gray-400 font-medium mb-1">Available Balance</p>
            <h1 className="text-5xl font-extrabold tracking-tight mb-8">$45.00</h1>
            
            <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl py-4 font-extrabold flex items-center justify-center space-x-2 active:scale-95 transition-transform">
               <Plus className="w-5 h-5" />
               <span>Top Up Balance</span>
            </button>
         </div>

         {/* Transactions */}
         <div className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-tight">Recent Transactions</h2>
            
            <div className="space-y-3">
               {transactions.map(t => (
                  <div key={t.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'Credit' ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-600'}`}>
                           {t.type === 'Credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">{t.title}</h3>
                           <p className="text-sm font-medium text-gray-500">{t.date}</p>
                        </div>
                     </div>
                     <span className={`font-extrabold ${t.type === 'Credit' ? 'text-green-600' : 'text-gray-900'}`}>
                        {t.type === 'Credit' ? '+' : '-'}${t.amount.toFixed(2)}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </MainLayout>
  );
}
