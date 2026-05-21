// ============================================================
// BannerKit — TypeScript Type Definitions
// ============================================================

export interface PromptTemplate {
  id: string;
  name: string;
  template: string;
  design_type?: string;
  style?: string;
  created_at: string;
}

// Prompt Generator Form
export interface PromptFormData {
  businessName: string;
  businessType: string;
  designType: string;
  mainColors: string;
  secondaryColors: string;
  style: string;
  moodColors: string;
  bannerSize: string;
  ratio: string;
  mainText: string;
  tagline: string;
  additionalNotes: string;
  lengthCm: string;
  widthCm: string;
  alignText: string;
  fontStyle: string;
  allowAiText: boolean;
  allowAiPhotos: boolean;
}
