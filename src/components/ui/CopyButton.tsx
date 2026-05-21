'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'icon';
}

export default function CopyButton({ text, label = 'Copy Prompt', className = '', variant = 'default' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Prompt berhasil disalin!', {
        style: {
          background: 'var(--surface)',
          color: 'var(--foreground)',
          border: '1px solid var(--border-color)',
        },
        iconTheme: { primary: 'var(--primary)', secondary: 'white' },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Gagal menyalin');
    }
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleCopy}
        className={`p-2 rounded-lg bg-surface hover:bg-surface-hover border border-border transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-muted" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-primary text-white hover:bg-primary-hover'
      } ${className}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Tersalin!' : label}
    </button>
  );
}
