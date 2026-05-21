export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-[3px] border-primary/10 border-t-primary animate-spin" />
        <div className="absolute w-12 h-12 rounded-full border-[3px] border-transparent border-b-primary/40 animate-pulse" />
      </div>
      <p className="text-sm font-medium text-muted animate-pulse">Memuat halaman...</p>
    </div>
  );
}
