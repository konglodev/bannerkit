import { PromptTemplate } from './types';

export const staticTemplates: PromptTemplate[] = [
  {
    id: 't1',
    name: 'Design Prompt AI v1',
    template: 'Professional {design_type} design for {business_name} ({business_type}). The main visual is centered around the theme of the business with a clean layout. The color scheme is dominated by {primary_color} as the main color, beautifully accented by {secondary_color} to create a {mood_color} mood. The overall aesthetic is {style}. High-quality typography in a {font_style} font displaying the main text "{main_text}" and tagline "{tagline}" positioned in the {align_text} of the design. Realistic materials and stunning studio lighting, perfect for high-resolution output. Final print resolution: {size} cm at 500 DPI. Aspect ratio is {ratio}. Additional elements: {add_text = allowed or not allowed} to add supporting AI generated text, {add_photos = allowed or not allowed} to add extra photo/asset layers. Do not crop, stretch, or change the canvas proportions. {notes}',
    design_type: 'banner',
    style: 'modern',
    created_at: new Date().toISOString()
  },
];
