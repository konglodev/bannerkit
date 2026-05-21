'use client';

import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
      {/* Visual Indicator */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl w-24 h-24 mx-auto" />
        <div className="relative w-20 h-20 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary mx-auto animate-pulse">
          <FileQuestion size={40} />
        </div>
      </div>
      
      {/* Message */}
      <h1 className="text-5xl font-black tracking-tight mb-2 text-primary">404</h1>
      <h2 className="text-xl font-bold mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-muted max-w-sm mx-auto mb-8 text-sm leading-relaxed">
        Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Mari kembali ke generator prompt.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-hover transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
      >
        <ArrowLeft size={16} />
        Kembali ke Generator
      </Link>
    </div>
  );
}
