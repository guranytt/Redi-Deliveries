import { MainLayout } from '@/components/Layout';
import { MOCK_ORDERS } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Orders() {
  return (
    <MainLayout title="My Orders">
      <div className="p-4 space-y-4">
        {MOCK_ORDERS.map(order => (
           <Link to={`/tracking/${order.id}`} key={order.id} className="block bg-white rounded-3xl p-5 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-center mb-4">
                 <div>
                    <h3 className="font-extrabold text-gray-900 text-lg">{order.vendor.name}</h3>
                    <p className="text-sm font-medium text-gray-500">{order.date}</p>
                 </div>
                 <div className="font-extrabold text-lg">${order.total.toFixed(2)}</div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                 <span className={`text-xs font-bold px-3 py-1 rounded-md ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.status}
                 </span>
                 <span className="text-sm font-medium text-gray-500">
                    • {order.items.length} items
                 </span>
              </div>
              
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                 <button className="flex-1 bg-gray-100 rounded-2xl py-3 font-bold text-gray-900 hover:bg-gray-200" onClick={(e) => { e.preventDefault(); }}>Reorder</button>
                 <button className="px-4 py-3 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-50" onClick={(e) => { e.preventDefault(); }}>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                 </button>
              </div>
           </Link>
        ))}
      </div>
    </MainLayout>
  );
}
