import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/Layout';
import { MapPin, Bike, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { cn } from '@/components/Layout';

export default function Tracking() {
  const { id } = useParams();
  
  const steps = [
    { title: 'Order Confirmed', time: '14:30', active: true },
    { title: 'Preparing Food', time: '14:32', active: true },
    { title: 'Picked Up', time: '14:45', active: true },
    { title: 'On the Way', time: '14:48', active: true, current: true },
    { title: 'Delivered', time: 'Est. 14:55', active: false },
  ];

  return (
    <MainLayout title="Order Tracking" backTo="/">
      {/* Map Simulation Area */}
      <div className="relative h-64 bg-gray-200">
         <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
         
         {/* Simulated Route */}
         <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-orange-600 rounded-full"></div>
         <div className="absolute top-1/2 left-1/4 -mt-2 -ml-2 bg-gray-900 text-white rounded-full p-1"><MapPin className="w-4 h-4"/></div>
         <div className="absolute top-1/2 right-1/4 -mt-3 mr-4 bg-orange-600 text-white rounded-full p-2 shadow-lg z-10"><Bike className="w-6 h-6"/></div>
      </div>

      <div className="px-6 py-6 pb-32">
         {/* Rider Info */}
         <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center justify-between -mt-12 relative z-20 mb-8">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                  <img src="https://ui-avatars.com/api/?name=John+Doe&background=random" alt="Rider" />
               </div>
               <div>
                  <h3 className="font-extrabold text-gray-900">John Doe</h3>
                  <p className="text-sm font-medium text-gray-500">Your Rider • ⭐ 4.9</p>
               </div>
            </div>
            <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200">
               <Phone className="w-5 h-5 text-gray-900" />
            </button>
         </div>

         {/* Timeline */}
         <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex flex-row items-start relative pb-6 last:pb-0">
                 {idx !== steps.length - 1 && (
                    <div className={cn("absolute top-8 bottom-0 left-[15px] w-0.5", step.active ? "bg-orange-600" : "bg-gray-200")} />
                 )}
                 <div className="z-10 flex-shrink-0">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors", step.current ? "bg-orange-600" : (step.active ? "bg-orange-600" : "bg-gray-200"))}>
                       {step.current ? <Bike className="w-4 h-4 text-white" /> : (step.active ? <CheckCircle2 className="w-4 h-4 text-white" /> : null)}
                    </div>
                 </div>
                 <div className="ml-4 flex-1">
                    <h3 className={cn("font-bold text-lg leading-tight", step.current ? "text-orange-600" : (step.active ? "text-gray-900" : "text-gray-400"))}>{step.title}</h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">{step.time}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </MainLayout>
  );
}
