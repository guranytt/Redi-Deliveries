import { MainLayout } from '@/components/Layout';
import { Users, Store, Receipt, TrendingUp } from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/data';

export default function Admin() {
  return (
    <MainLayout title="Admin Dashboard" backTo="/">
      <div className="p-4 space-y-6 pb-24">
         
         {/* Stats */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-3xl p-5 border border-orange-100">
               <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-sm text-orange-600">
                  <TrendingUp className="w-5 h-5"/>
               </div>
               <p className="text-gray-500 font-bold text-sm">Today's Revenue</p>
               <h2 className="text-2xl font-extrabold text-gray-900">$1,432.00</h2>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
               <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-gray-700">
                  <Receipt className="w-5 h-5"/>
               </div>
               <p className="text-gray-500 font-bold text-sm">Active Orders</p>
               <h2 className="text-2xl font-extrabold text-gray-900">24</h2>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
               <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-gray-700">
                  <Store className="w-5 h-5"/>
               </div>
               <p className="text-gray-500 font-bold text-sm">Vendors</p>
               <h2 className="text-2xl font-extrabold text-gray-900">12</h2>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
               <div className="bg-gray-50 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-gray-700">
                  <Users className="w-5 h-5"/>
               </div>
               <p className="text-gray-500 font-bold text-sm">Riders</p>
               <h2 className="text-2xl font-extrabold text-gray-900">8</h2>
            </div>
         </div>

         {/* Live Orders Map / List view */}
         <div className="space-y-4">
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-extrabold tracking-tight">Active Deliveries</h2>
               <button className="text-orange-600 font-bold text-sm">View Map</button>
            </div>
            <div className="space-y-3">
               {MOCK_ORDERS.filter(o => o.status !== 'Delivered').map(order => (
                  <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-md">{order.status}</span>
                           <h3 className="font-extrabold text-gray-900 mt-2">{order.vendor.name}</h3>
                        </div>
                        <div className="text-right">
                           <span className="font-extrabold">${order.total.toFixed(2)}</span>
                           <p className="text-xs text-gray-500 font-medium mt-1">ID: {order.id}</p>
                        </div>
                     </div>
                     <div className="border-t border-gray-100 pt-3 mt-3 flex items-center space-x-2">
                        <select className="bg-gray-50 border border-gray-200 text-sm font-bold rounded-lg px-2 py-1 outline-none text-gray-700 flex-1">
                           <option>Select Rider</option>
                           <option>John Doe</option>
                           <option>Mike Smith</option>
                        </select>
                        <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-bold">Update</button>
                     </div>
                  </div>
               ))}
               {MOCK_ORDERS.filter(o => o.status !== 'Delivered').length === 0 && (
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm">
                   <p className="text-gray-500 font-medium">No active deliveries.</p>
                 </div>
               )}
            </div>
         </div>

      </div>
    </MainLayout>
  );
}
