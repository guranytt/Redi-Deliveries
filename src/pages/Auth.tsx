import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Auth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Check if Supabase is configured
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'YOUR_SUPABASE_URL' || import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.warn("Supabase not configured. Mocking OTP send.");
      setTimeout(() => {
        setStep('otp');
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
      });
      if (error) throw error;
      setStep('otp');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'YOUR_SUPABASE_URL' || import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.warn("Supabase not configured. Mocking auth success.");
      setTimeout(() => {
        router.push('/');
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 pb-32">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-orange-600 tracking-tighter mb-2">REDI</h1>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            {step === 'phone' ? 'Enter your phone' : 'Enter OTP'}
          </h2>
          <p className="text-gray-500 font-medium mt-2">
            {step === 'phone' ? "We'll send you a confirmation code." : `Sent to ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-4 text-center text-xl font-bold tracking-widest focus:ring-4 focus:ring-orange-100 focus:border-orange-600 outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white rounded-full py-4 font-extrabold text-lg shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-4 py-4 text-center text-3xl font-extrabold tracking-[0.5em] focus:ring-4 focus:ring-orange-100 focus:border-orange-600 outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white rounded-full py-4 font-extrabold text-lg shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button type="button" onClick={() => setStep('phone')} className="w-full text-center text-gray-500 font-bold hover:text-gray-900">
               Change phone number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
