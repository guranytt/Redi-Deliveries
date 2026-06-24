"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Receipt, Wallet, User, Store } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Layout Components
export function Header({ title, backTo, action }: { title?: string, backTo?: string, action?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm px-4 h-16 flex items-center justify-between">
      {backTo ? (
        <Link href={backTo} className="p-2 -ml-2 rounded-full active:bg-gray-100">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <div className="w-10"></div>
      )}
      <h1 className="text-xl font-bold tracking-tight text-center flex-1">{title || 'REDI'}</h1>
      <div className="w-10 flex justify-end">
        {action}
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Stores', path: '/stores', icon: Store },
    { name: 'Orders', path: '/orders', icon: Receipt },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Profile', path: '/auth', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.path || pathname?.startsWith(tab.path + '/');
          // Exceptions for home
          const isHomeActive = pathname === '/';
          const active = tab.path === '/' ? isHomeActive : isActive;

          return (
            <Link key={tab.name} href={tab.path} className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-semibold", active ? "text-red-500" : "text-gray-500 hover:text-gray-900")}>
              <Icon className={cn("w-6 h-6", active && "stroke-2")} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function MainLayout({ children, noHeader = false, title, backTo, noBottomNav = false }: { children: React.ReactNode, noHeader?: boolean, title?: string, backTo?: string, noBottomNav?: boolean }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row md:max-w-7xl md:mx-auto shadow-sm">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 bg-white sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 tracking-tighter">REDI</h1>
          <p className="text-sm text-gray-500 font-medium">Campus Delivery</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/" className="flex flex-row items-center space-x-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl font-bold">
            <Home className="w-5 h-5" /> <span>Home</span>
          </Link>
          <Link href="/stores" className="flex flex-row items-center space-x-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl font-bold">
            <Store className="w-5 h-5" /> <span>Stores</span>
          </Link>
          <Link href="/orders" className="flex flex-row items-center space-x-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl font-bold">
            <Receipt className="w-5 h-5" /> <span>Orders</span>
          </Link>
          <Link href="/wallet" className="flex flex-row items-center space-x-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl font-bold">
            <Wallet className="w-5 h-5" /> <span>Wallet</span>
          </Link>
          <Link href="/auth" className="flex flex-row items-center space-x-3 text-gray-700 hover:bg-gray-100 p-3 rounded-xl font-bold">
            <User className="w-5 h-5" /> <span>Profile</span>
          </Link>
          <Link href="/admin" className="flex flex-row items-center space-x-3 text-red-600 hover:bg-red-50 p-3 rounded-xl font-bold mt-8 border border-red-100">
             <span>Admin Dashboard</span>
          </Link>
        </nav>
      </aside>

      <main className={cn("flex-1 bg-white md:bg-gray-50 w-full pb-20 md:pb-0 min-h-screen relative max-w-md mx-auto md:max-w-none shadow-xl")}>
        {!noHeader && <Header title={title} backTo={backTo} />}
        {children}
        {!noBottomNav && <BottomNav />}
      </main>
    </div>
  );
}
