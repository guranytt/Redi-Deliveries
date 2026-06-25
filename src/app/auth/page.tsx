"use client";
import React, { useEffect, useState } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '@/components/Layout';
import { CldUploadWidget } from 'next-cloudinary';
import { LogOut, User as UserIcon, Camera } from 'lucide-react';

export default function Profile() {
  const { user, isLoaded } = useUser();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      // Fetch user info from Supabase
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_id', user.id)
          .single();
        
        if (data) setProfileData(data);
      };
      fetchProfile();
    }
  }, [user]);

  const handleUploadSuccess = async (result: any) => {
    const imageUrl = result.info.secure_url;
    if (user) {
      // Upsert into Supabase
      const { data } = await supabase
        .from('users')
        .upsert({ clerk_id: user.id, email: user.primaryEmailAddress?.emailAddress, name: user.fullName, avatar_url: imageUrl })
        .select()
        .single();
      
      if (data) setProfileData(data);
    }
  };

  if (!isLoaded) return <MainLayout><div className="p-4 text-center">Loading...</div></MainLayout>;

  return (
    <MainLayout title="Profile">
      <div className="p-4">
        {!user ? (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-extrabold mb-4">Welcome to REDI</h1>
            <SignInButton mode="modal">
              <button className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3 px-6 rounded-full">
                Login with Clerk
              </button>
            </SignInButton>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative mt-10">
            <div className="relative inline-block -mt-16 mb-4">
              {profileData?.avatar_url || user.imageUrl ? (
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto">
                   <img src={profileData?.avatar_url || user.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md mx-auto">
                  <UserIcon className="w-10 h-10 text-gray-400" />
                </div>
              )}
              
              <CldUploadWidget uploadPreset="ml_default" onSuccess={handleUploadSuccess}>
                {({ open }) => (
                  <button onClick={() => open()} className="absolute bottom-0 right-0 bg-gradient-to-r from-red-600 to-orange-500 text-white p-2 rounded-full shadow-lg hover:from-red-700 hover:to-orange-600 transition">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </CldUploadWidget>
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900">{profileData?.name || user.fullName}</h2>
            <p className="text-gray-500 font-medium">{user.primaryEmailAddress?.emailAddress}</p>
            
            <div className="mt-8">
              <SignOutButton>
                <button className="flex items-center justify-center space-x-2 w-full bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </SignOutButton>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
