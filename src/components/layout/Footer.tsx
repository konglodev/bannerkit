import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2 grayscale hover:grayscale-0 transition-all">
            <Image
              src="/logo-bannerkit.png"
              alt="BannerKit Logo"
              width={160}
              height={45}
              className="h-9 w-auto object-contain  opacity-70 hover:opacity-100 transition-all"
            />
            <span className="font-bold text-lg">
              Banner<span className="text-primary">Kit</span>
            </span>
          </div>

          <p className="text-xs text-muted flex items-center gap-1">
            Desain promo praktis untuk mendukung UMKM Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
