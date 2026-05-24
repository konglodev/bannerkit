"use client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Wand2,
  Sparkles,
  RotateCcw,
  X,
  Heart,
  ExternalLink,
  BadgeCheck,
} from "lucide-react";
import CopyButton from "@/components/ui/CopyButton";
import { buildPrompt, buildNegativePrompt } from "@/lib/promptBuilder";
import { PromptFormData, PromptTemplate } from "@/lib/types";
import { staticTemplates } from "@/lib/templates";

// KUSTOMISASI: Tempel link gambar QR Code Google Drive Anda di bawah ini!
const DONATION_QR_CODE_URL =
  "https://drive.google.com/file/d/1tSjVTgHG89vH0HHt0xPIlMl8KC0f508d/view?usp=sharing";

function getDirectImageUrl(url: string): string {
  if (!url) return "";

  if (url.includes("drive.google.com")) {
    const fileIdMatch =
      url.match(/\/d\/(.+?)\//) ||
      url.match(/id=(.+?)(&|$)/) ||
      url.match(/\/file\/d\/(.+?)(\/|$)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
    }
  }

  return url;
}

const defaultForm: PromptFormData = {
  businessName: "",
  businessType: "",
  designType: "",
  mainColors: "",
  secondaryColors: "",
  style: "",
  moodColors: "",
  bannerSize: "",
  ratio: "",
  mainText: "",
  tagline: "",
  additionalNotes: "",
  lengthCm: "",
  widthCm: "",
  alignText: "",
  fontStyle: "",
  allowAiText: false,
  allowAiPhotos: false,
};

const businessTypes = [
  { value: "food-beverage", label: "Makanan & Minuman" },
  { value: "fashion-apparel", label: "Fashion & Pakaian" },
  { value: "beauty-skincare", label: "Kecantikan & Skincare" },
  { value: "services-business", label: "Jasa & Layanan" },
  { value: "technology-gadgets", label: "Teknologi & Gadget" },
  { value: "health-herbal", label: "Kesehatan & Herbal" },
  { value: "property-interior", label: "Properti & Interior" },
  { value: "events-entertainment", label: "Event & Acara" },
  { value: "education-courses", label: "Pendidikan & Kursus" },
  { value: "automotive", label: "Otomotif" },
];

const designTypes = [
  { value: "banner", label: "Banner" },
  { value: "poster", label: "Poster" },
  { value: "flyer", label: "Flyer" },
  { value: "social-media", label: "Social Media Post" },
  { value: "ig-story", label: "Instagram Story" },
  { value: "ig-post", label: "Instagram Post" },
];

const styles = [
  { value: "futuristic", label: "Futuristik" },
  { value: "luxury", label: "Mewah" },
  { value: "street-style", label: "Street Style" },
  { value: "cyberpunk", label: "Cyberpunk" },
  { value: "clean-ui", label: "Clean UI" },
  { value: "glassmorphism", label: "Glassmorphism" },
  { value: "neon-vibes", label: "Neon Vibes" },
  { value: "cartoon", label: "Kartun" },
  { value: "gaming-esport", label: "Gaming/Esport" },
  { value: "korean-style", label: "Korean Style" },
  { value: "japanese-style", label: "Japanese Style" },
  { value: "urban-modern", label: "Urban Modern" },
  { value: "gradient-style", label: "Gradient Style" },
  { value: "food-promo", label: "Food Promo" },
  { value: "tech-style", label: "Teknologi" },
  { value: "cinematic", label: "Cinematic" },
  { value: "magazine", label: "Magazine Style" },
  { value: "instagramable", label: "Instagramable" },
  { value: "luxury-dark", label: "Dark Luxury" },
  { value: "retro-wave", label: "Retro Wave" },
  { value: "cute-kawaii", label: "Cute Kawaii" },
  { value: "comic-style", label: "Comic Style" },
  { value: "festival-style", label: "Festival Style" },
  { value: "nature-inspired", label: "Nature Inspired" },
  { value: "high-contrast", label: "High Contrast" },
  { value: "abstract-art", label: "Abstract Art" },
  { value: "3d-style", label: "3D Style" },
  { value: "monochrome", label: "Monochrome" },
  { value: "soft-aesthetic", label: "Soft Aesthetic" },
  { value: "premium-branding", label: "Premium Branding" },
  { value: "dynamic-layout", label: "Dynamic Layout" },
];

const fontStyles = [
  { value: "bold-modern", label: "Bold Modern" },
  { value: "clean-minimal", label: "Clean Minimal" },
  { value: "luxury-elegant", label: "Luxury Elegant" },
  { value: "playful-fun", label: "Playful Fun" },
  { value: "street-graffiti", label: "Street Graffiti" },
  { value: "futuristic-tech", label: "Futuristic Tech" },
  { value: "retro-vintage", label: "Retro Vintage" },
  { value: "handwritten", label: "Handwritten" },
  { value: "comic-style", label: "Comic Style" },
  { value: "sporty-bold", label: "Sporty Bold" },
  { value: "cinematic", label: "Cinematic" },
  { value: "cute-rounded", label: "Cute Rounded" },
  { value: "premium-serif", label: "Premium Serif" },
  { value: "condensed-impact", label: "Condensed Impact" },
  { value: "urban-modern", label: "Urban Modern" },
  { value: "neon-glow", label: "Neon Glow" },
  { value: "classic-formal", label: "Classic Formal" },
  { value: "brush-style", label: "Brush Style" },
  { value: "digital-display", label: "Digital Display" },
  { value: "3d-stylish", label: "3D Stylish" },
];

const moodColors = [
  { value: "bright-cheerful", label: "Ceria & Terang" },
  { value: "modern-clean", label: "Modern & Bersih" },
  { value: "luxury-elegant", label: "Mewah & Elegan" },
  { value: "crowded-festive", label: "Ramai & Meriah" },
  { value: "minimalist", label: "Minimalis" },
  { value: "pastel-colors", label: "Warna Pastel" },
  { value: "dark-premium", label: "Gelap Premium" },
  { value: "fresh-natural", label: "Segar & Natural" },
  { value: "kids-cheerful", label: "Ceria Anak-Anak" },
  { value: "sporty-energetic", label: "Sporty & Enerjik" },
  { value: "retro-vintage", label: "Retro Vintage" },
  { value: "futuristic-neon", label: "Futuristik Neon" },
  { value: "appetite-colors", label: "Warna Menggugah Selera" },
  { value: "simple-professional", label: "Simple Profesional" },
  { value: "soft-feminine", label: "Lembut & Feminim" },
  { value: "strong-contrast", label: "Kontras Kuat" },
  { value: "green-nature", label: "Nuansa Alam Hijau" },
  { value: "corporate-blue", label: "Biru Korporat" },
  { value: "black-gold", label: "Hitam Emas" },
  { value: "colorful-fun", label: "Warna-Warni Fun" },
  { value: "warm-sunset", label: "Sunset Hangat" },
  { value: "modern-night", label: "Malam Modern" },
  { value: "modern-gradient", label: "Gradasi Kekinian" },
  { value: "clean-white", label: "Putih Bersih" },
  { value: "sweet-pink", label: "Pink Manis" },
  { value: "fiery-orange", label: "Oranye Api" },
  { value: "luxury-purple", label: "Ungu Mewah" },
  { value: "calm-aesthetic", label: "Kalem Estetik" },
  { value: "festival-theme", label: "Tema Festival" },
  { value: "technology-theme", label: "Tema Teknologi" },
];

const ratios = [
  "16:9",
  "9:16",
  "4:3",
  "4:2",
  "4:1",
  "3:4",
  "3:2",
  "3:1",
  "2:1",
  "1:1",
  "A4",
  "A3",
];

const aiPlatforms = [
  {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    description: "Recommended",
    recommended: true,
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com/",
    description: "Google AI",
  },
  {
    name: "Midjourney",
    url: "https://www.midjourney.com/",
    description: "Image AI",
  },
  {
    name: "Ideogram",
    url: "https://ideogram.ai/",
    description: "Text & poster",
  },
  {
    name: "Leonardo AI",
    url: "https://leonardo.ai/",
    description: "Creative image",
  },
  {
    name: "Adobe Firefly",
    url: "https://firefly.adobe.com/",
    description: "Design AI",
  },
];

export default function HomePage() {
  const [form, setForm] = useState<PromptFormData>(defaultForm);
  const [templates] = useState<PromptTemplate[]>(staticTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [showDonationModal, setShowDonationModal] = useState<boolean>(true);

  const updateField = <K extends keyof PromptFormData>(
    field: K,
    value: PromptFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const currentTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId),
    [templates, selectedTemplateId],
  );

  const generatedPrompt = useMemo(() => {
    if (!currentTemplate) return buildPrompt(form);

    let tpl = currentTemplate.template;

    // Calculate pixels at 300 DPI
    const cmToPx = (cm: string) =>
      Math.round(parseFloat(cm || "0") * (300 / 2.54));
    const widthPx = cmToPx(form.widthCm);
    const heightPx = cmToPx(form.lengthCm);
    const size = `${form.lengthCm} x ${form.widthCm}`;
    const ratio = form.ratio;
    const notes = form.additionalNotes;

    // Variable replacement mapping — use actual user input only (empty string when not filled)
    const replacements: Record<string, string> = {
      "{business_name}": form.businessName,
      "{business_type}": form.businessType,
      "{design_type}": form.designType || "banner",
      "{main_text}": form.mainText,
      "{tagline}": form.tagline,
      "{primary_color}": form.mainColors,
      "{secondary_color}": form.secondaryColors,
      "{mood_color}": form.moodColors,
      "{style}": form.style,
      "{font_style}": form.fontStyle,
      "{ratio}": ratio,
      "{size}": size,
      "{length cm}": form.lengthCm,
      "{width cm}": form.widthCm,
      "{convert length cm to px}": heightPx > 0 ? heightPx.toString() : "",
      "{convert width cm to px}": widthPx > 0 ? widthPx.toString() : "",
      "{align_text}": form.alignText,
      "{design_style}": form.style,
      "{add_text = allowed or not allowed}": form.allowAiText
        ? "allowed"
        : "not allowed",
      "{add_photos = allowed or not allowed}": form.allowAiPhotos
        ? "allowed"
        : "not allowed",
      "{notes}": notes,
    };

    Object.entries(replacements).forEach(([key, val]) => {
      tpl = tpl.replaceAll(key, val);
    });

    // Clean up artifacts from empty replacements (e.g. double spaces, empty parentheses)
    tpl = tpl
      .replace(/\(\s*\)/g, "") // remove empty ()
      .replace(/\s{2,}/g, " ") // collapse multiple spaces
      .replace(/,\s*,/g, ",") // collapse double commas
      .replace(/\s+\./g, ".") // remove space before period
      .replace(/\s+,/g, ",") // remove space before comma
      .trim();

    return tpl;
  }, [currentTemplate, form]);
  const negativePrompt = buildNegativePrompt();
  const fullPrompt = `${generatedPrompt}\n\nNegative Prompt:\n${negativePrompt}`;

  const hasStartedFilling =
    form.businessName ||
    form.mainText ||
    form.businessType ||
    form.mainColors ||
    form.secondaryColors ||
    selectedTemplateId;

  // const inputClass =
  //   "w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
  // const labelClass = "block text-sm font-medium mb-1.5";
  // const donationModal =
  //   showDonationModal && typeof document !== "undefined"
  //     ? createPortal(
  //         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
  //           {/* Backdrop Overlay */}
  //           <div
  //             className="absolute inset-0 bg-background/90 backdrop-blur-md animate-fade-in"
  //             onClick={() => setShowDonationModal(false)}
  //           />

  //           {/* Modal Container */}
  //           <div className="relative z-10 w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-card border border-border/80 shadow-2xl shadow-primary/10 animate-scale-in p-6">
  //             {/* Soft Gradient glow at top */}
  //             <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

  //             {/* Close Button */}
  //             <button
  //               onClick={() => setShowDonationModal(false)}
  //               className="absolute top-4 right-4 p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-primary/30 text-muted hover:text-foreground transition-all duration-200"
  //               aria-label="Tutup"
  //             >
  //               <X size={16} />
  //             </button>

  //             {/* Header info */}
  //             <div className="text-center space-y-2 mt-4">
  //               <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider animate-pulse">
  //                 <Heart size={12} className="fill-primary" />
  //                 Donasi Pengembangan
  //               </div>
  //               <h3 className="text-xl font-bold tracking-tight">
  //                 Dukung BannerKit!
  //               </h3>
  //               <p className="text-muted text-xs max-w-xs mx-auto leading-relaxed">
  //                 Jika Anda terbantu dengan platform ini, dukungan melalui
  //                 donasi akan sangat berarti untuk pengembangan dan operasional
  //                 platform kami!
  //               </p>
  //             </div>

  //             {/* QR Code Container */}
  //             <div className="my-6 p-4 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center relative group">
  //               {DONATION_QR_CODE_URL.includes("DONATE") ? (
  //                 // Beautiful placeholder QR representation
  //                 <div className="w-48 h-48 rounded-xl bg-card border border-border/50 flex flex-col items-center justify-center p-4 text-center space-y-2">
  //                   <div className="relative w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center text-primary/40">
  //                     <Wand2 size={28} />
  //                     <div className="absolute inset-0 border border-primary/20 rounded-xl animate-ping opacity-20" />
  //                   </div>
  //                   <div className="space-y-1">
  //                     <p className="text-[10px] font-bold text-muted">
  //                       QR Code
  //                     </p>
  //                     <p className="text-[8px] text-muted/60 leading-normal max-w-[130px] mx-auto">
  //                       Scan QR Code Ini
  //                     </p>
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <div className="relative overflow-hidden rounded-xl bg-white p-2">
  //                   <img
  //                     src={getDirectImageUrl(DONATION_QR_CODE_URL)}
  //                     alt="Donation QR Code"
  //                     className="w-48 h-48 object-contain select-none"
  //                     onError={(e) => {
  //                       // Fallback visual in case GDrive url is broken/expired
  //                       e.currentTarget.style.display = "none";
  //                       const parent = e.currentTarget.parentElement;
  //                       if (parent) {
  //                         const fallbackDiv = document.createElement("div");
  //                         fallbackDiv.className =
  //                           "w-48 h-48 flex items-center justify-center text-xs text-muted bg-surface text-center p-4";
  //                         fallbackDiv.innerText =
  //                           "QR Code gagal dimuat. Jika platform ini bermanfaat, Anda dapat mendukung pengembangannya melalui donasi berikut : https://saweria.co/aripppjn";
  //                         parent.appendChild(fallbackDiv);
  //                       }
  //                     }}
  //                   />
  //                 </div>
  //               )}

  //               <div className="mt-3 text-center">
  //                 <span className="text-[10px] font-bold tracking-widest text-muted uppercase">
  //                   Scan QR Saweria
  //                 </span>
  //               </div>
  //             </div>

  //             {/* Actions */}
  //             <div className="flex flex-col gap-2">
  //               <button
  //                 onClick={() => setShowDonationModal(false)}
  //                 className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 text-center cursor-pointer"
  //               >
  //                 Saya Telah Berdonasi / Tutup
  //               </button>
  //               <p className="text-[10px] text-muted text-center leading-normal">
  //                 Terima kasih atas kepedulian dan kebaikan hati Anda untuk
  //                 kemajuan UMKM Indonesia.
  //               </p>
  //             </div>
  //           </div>
  //         </div>,
  //         document.body,
  //       )
  //     : null;

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";
  const labelClass = "block text-sm font-medium mb-1.5";

  const donationModal =
    showDonationModal && typeof document !== "undefined"
      ? createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-md animate-fade-in"
            onClick={() => setShowDonationModal(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-card border border-border/80 shadow-2xl shadow-primary/10 animate-scale-in p-6">
            {/* Soft Gradient glow at top */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setShowDonationModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover hover:border-primary/30 text-muted hover:text-foreground transition-all duration-200"
              aria-label="Tutup"
            >
              <X size={16} />
            </button>

            {/* Header info */}
            <div className="text-center space-y-2 mt-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#be1e2d]/10 text-[#be1e2d] text-xs font-bold uppercase tracking-wider">
                <Heart size={12} className="fill-[#be1e2d]" />
                Donasi Trakteer
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Dukung BannerKit!
              </h3>
              <p className="text-muted text-xs max-w-xs mx-auto leading-relaxed">
                Jika Anda terbantu dengan platform ini, dukungan melalui
                Trakteer akan sangat berarti untuk pengembangan dan operasional
                platform kami!
              </p>
            </div>

            {/* Trakteer Button Integration */}
            <div className="my-6 p-2 rounded-2xl bg-surface border border-border flex flex-col items-center justify-center">
              <a
                href="https://trakteer.id/aripppjn_/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#be1e2d] text-white font-bold text-base hover:bg-[#a01624] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-[#be1e2d]/20 text-center"
              >
                {/* Trakteer Icon Custom Placeholder (Menggunakan Wand2 bawaan Anda atau Icon lain) */}
                <img
                  src="https://edge-cdn.trakteer.id/images/embed/trbtn-icon.png?v=14-05-2025"
                  alt="Trakteer Icon"
                  className="w-5 h-5 object-contain invert animate-bounce"
                />
                Dukung Saya di Trakteer
              </a>

              <div className="mt-3 text-center">
                <span className="text-[10px] font-bold tracking-widest text-muted uppercase">
                  Klik tombol di atas untuk membuka Trakteer
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowDonationModal(false)}
                className="w-full py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground font-semibold text-sm active:scale-[0.98] transition-all duration-200 text-center cursor-pointer"
              >
                Tutup Halaman
              </button>
              <p className="text-[10px] text-muted text-center leading-normal">
                Terima kasih atas kepedulian dan kebaikan hati Anda untuk
                kemajuan UMKM Indonesia.
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )
      : null;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Wand2 size={14} />
            AI Prompt Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Buat Prompt AI untuk Banner Bisnis Anda
          </h1>
          <p className="text-muted max-w-xl mx-auto">
            Isi detail bisnis Anda dan dapatkan prompt profesional yang siap
            digunakan di AI image generator.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Sparkles size={18} className="text-primary" /> Template &
                Bisnis
              </h2>

              <div>
                <label className={labelClass}>Pilih Template</label>
                <select
                  className={`${inputClass} border-primary/30 bg-primary/5`}
                  value={selectedTemplateId}
                  onChange={(e) => setSelectedTemplateId(e.target.value)}
                >
                  <option value="" defaultValue={""} disabled>
                    Pilih template...
                  </option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-muted mt-2">
                  Template akan menentukan format prompt yang dihasilkan.
                </p>
              </div>

              <div className="pt-2 border-t border-border/50">
                <label className={labelClass}>Nama Bisnis</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="cth: Warung Bu Sari"
                  value={form.businessName || ""}
                  onChange={(e) => updateField("businessName", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Jenis Bisnis</label>
                <select
                  className={inputClass}
                  value={form.businessType}
                  onChange={(e) => updateField("businessType", e.target.value)}
                >
                  <option value="" defaultValue={""} disabled>
                    Pilih jenis bisnis...
                  </option>
                  {businessTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Tipe Desain</label>
                  <select
                    className={inputClass}
                    value={form.designType}
                    onChange={(e) => updateField("designType", e.target.value)}
                  >
                    <option value="" defaultValue={""} disabled>
                      Pilih tipe desain...
                    </option>
                    {designTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Rasio</label>
                  <select
                    className={inputClass}
                    value={form.ratio}
                    onChange={(e) => updateField("ratio", e.target.value)}
                  >
                    <option value="" defaultValue={""} disabled>
                      Pilih rasio...
                    </option>
                    {ratios.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 block">
                  Dimensi Fisik (Cetak)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Panjang (cm)</label>
                    <input
                      type="number"
                      className={inputClass}
                      value={form.lengthCm || ""}
                      onChange={(e) => updateField("lengthCm", e.target.value)}
                      placeholder="cth: 300"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Lebar (cm)</label>
                    <input
                      type="number"
                      className={inputClass}
                      value={form.widthCm || ""}
                      onChange={(e) => updateField("widthCm", e.target.value)}
                      placeholder="cth: 100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
              <h2 className="font-bold text-lg">🎨 Gaya & Warna</h2>

              <div>
                <label className={labelClass}>Gaya Desain</label>
                <select
                  className={inputClass}
                  value={form.style}
                  onChange={(e) => updateField("style", e.target.value)}
                >
                  <option value="" defaultValue={""} disabled>
                    Pilih Gaya Desain...
                  </option>
                  {styles.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Skema / Mood Warna</label>
                <select
                  className={inputClass}
                  value={form.moodColors}
                  onChange={(e) => updateField("moodColors", e.target.value)}
                >
                  <option value="" defaultValue={""} disabled>
                    Pilih Skema / Mood Warna...
                  </option>
                  {moodColors.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Warna Utama</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="cth: orange, biru tua"
                    value={form.mainColors || ""}
                    onChange={(e) => updateField("mainColors", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Warna Sekunder</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="cth: putih, krem"
                    value={form.secondaryColors || ""}
                    onChange={(e) =>
                      updateField("secondaryColors", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
              <h2 className="font-bold text-lg">📝 Konten</h2>

              <div>
                <label className={labelClass}>Teks Utama</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="cth: PROMO SPESIAL HARI INI"
                  value={form.mainText || ""}
                  onChange={(e) => updateField("mainText", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="cth: Mewah Murah Meriah"
                  value={form.tagline || ""}
                  onChange={(e) => updateField("tagline", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Font Style</label>
                  <select
                    className={inputClass}
                    value={form.fontStyle}
                    onChange={(e) => updateField("fontStyle", e.target.value)}
                  >
                    <option value="" defaultValue={""} disabled>
                      Pilih font style...
                    </option>
                    {fontStyles.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Posisi Teks</label>
                  <select
                    className={inputClass}
                    value={form.alignText}
                    onChange={(e) => updateField("alignText", e.target.value)}
                  >
                    <option value="" defaultValue={""} disabled>
                      Pilih posisi teks...
                    </option>
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 block">
                  Pengaturan AI
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 transition-all"
                      checked={form.allowAiText}
                      onChange={(e) =>
                        updateField("allowAiText", e.target.checked)
                      }
                    />
                    <span className="text-sm text-muted group-hover:text-foreground">
                      Izinkan AI menambah teks pendukung
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 transition-all"
                      checked={form.allowAiPhotos}
                      onChange={(e) =>
                        updateField("allowAiPhotos", e.target.checked)
                      }
                    />
                    <span className="text-sm text-muted group-hover:text-foreground">
                      Izinkan AI menambah elemen foto/aset
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className={labelClass}>Catatan Tambahan</label>
                <textarea
                  className={`${inputClass} min-h-[80px] resize-y`}
                  placeholder="cth: Tambahkan list menu berikut... "
                  value={form.additionalNotes || ""}
                  onChange={(e) =>
                    updateField("additionalNotes", e.target.value)
                  }
                />
              </div>
            </div>

            <button
              onClick={() => setForm(defaultForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted hover:text-foreground hover:bg-surface border border-border transition-all"
            >
              <RotateCcw size={14} /> Reset Form
            </button>
          </div>

          {/* Output */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {hasStartedFilling ? (
              <>
                <div className="p-6 rounded-2xl bg-card border border-border space-y-5 shadow-xl shadow-primary/5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                      <Wand2 size={18} className="text-primary" /> Hasil Prompt
                    </h2>
                    <div className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      Ready to Use
                    </div>
                  </div>

                  {/* Generated Prompt Consolidated */}
                  <div className="space-y-4">
                    <div className="relative p-5 rounded-2xl bg-surface border border-border group transition-all hover:border-primary/30">
                      <div className="absolute top-4 right-4 z-10">
                        <CopyButton text={fullPrompt} variant="icon" />
                      </div>
                      <div className="space-y-4 max-h-[400px] overflow-auto pr-4 scrollbar-thin">
                        <div>
                          <h3 className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                            Positive Prompt
                          </h3>
                          <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap text-foreground">
                            {generatedPrompt}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <h3 className="text-xs font-bold text-red-500 mb-2 uppercase tracking-widest">
                            Negative Prompt
                          </h3>
                          <p className="text-sm leading-relaxed font-mono whitespace-pre-wrap text-muted">
                            {negativePrompt}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CopyButton
                      text={fullPrompt}
                      label="Salin Semua Prompt"
                      className="w-full justify-center py-4 text-base shadow-lg shadow-primary/20"
                    />

                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest">
                          Buka di Platform AI
                        </h3>
                        <span className="text-[10px] text-muted">
                          Salin prompt dulu, lalu buka platform
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {aiPlatforms.map((platform) => (
                          <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Buka ${platform.name}`}
                            className={`group flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all active:scale-[0.99] ${platform.recommended
                                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-hover"
                                : "border-border bg-surface hover:border-primary/40 hover:bg-surface-hover"
                              }`}
                          >
                            <span className="min-w-0">
                              <span className="flex items-center gap-1.5 text-sm font-bold">
                                {platform.recommended && (
                                  <BadgeCheck size={15} className="shrink-0" />
                                )}
                                <span className="truncate">
                                  {platform.name}
                                </span>
                              </span>
                              <span
                                className={`mt-0.5 block text-xs ${platform.recommended ? "text-white/80" : "text-muted"}`}
                              >
                                {platform.description}
                              </span>
                            </span>
                            <ExternalLink
                              size={16}
                              className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${platform.recommended ? "text-white/90" : "text-primary"}`}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 animate-fade-in">
                  <h3 className="font-bold text-sm mb-2 text-primary">
                    💡 Tips
                  </h3>
                  <ul className="text-sm text-muted space-y-1.5">
                    <li>• Semakin detail informasi, semakin bagus hasil AI</li>
                    <li>
                      • Gunakan prompt dalam bahasa Inggris untuk hasil terbaik
                    </li>
                    <li>• Sesuaikan ukuran dengan kebutuhan cetak Anda</li>
                    <li>
                      • Negative prompt membantu menghindari hasil yang tidak
                      diinginkan
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="p-12 rounded-3xl bg-surface/50 border-2 border-dashed border-border flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/30">
                  <Wand2 size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-muted">Belum Ada Prompt</h3>
                  <p className="text-xs text-muted/60 max-w-[200px]">
                    Mulai isi formulir untuk melihat hasil prompt AI Anda.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {donationModal}
    </div>
  );
}
