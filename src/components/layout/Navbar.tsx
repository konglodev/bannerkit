'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 sm:gap-2 group" id="nav-logo">
            <Image 
              src="/logo-bannerkit.png" 
              alt="BannerKit Logo" 
              width={220} 
              height={60} 
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-5"
              priority
            />
            <span className="text-xl font-bold tracking-tight sm:text-2xl">
              Banner<span className="text-primary">Kit</span>
            </span>
          </Link>
          
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
