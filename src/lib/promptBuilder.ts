import { PromptFormData } from './types';

export function buildPrompt(data: PromptFormData): string {
  const parts: string[] = [];

  // 1. Core design type
  parts.push(`Create a print-ready ${data.designType || 'graphic'} design.`);

  // 2. Physical dimensions — only if the user provided them
  const hasLength = data.lengthCm && parseFloat(data.lengthCm) > 0;
  const hasWidth = data.widthCm && parseFloat(data.widthCm) > 0;

  if (hasLength && hasWidth) {
    const cmToPx = (cm: string) => Math.round(parseFloat(cm) * (300 / 2.54));
    const widthPx = cmToPx(data.widthCm);
    const heightPx = cmToPx(data.lengthCm);
    const ratio = `${data.ratio}`;
    const size = `${data.lengthCm}x${data.widthCm}`;

    parts.push(
      `\nFinal physical dimensions: ${data.lengthCm} cm x ${data.widthCm} cm.`,
      `Final aspect ratio: ${ratio}.`,
      `Final size (cm): ${size}.`,
      `Final print resolution: ${heightPx} x ${widthPx} at 300 DPI.`,
      `\nThe aspect ratio must be maintained at ${ratio}.`,
      `Do not crop, stretch, or change the canvas proportions.`
    );
  } else if (data.ratio) {
    parts.push(`\nAspect ratio: ${data.ratio}.`);
  }

  // 3. Colors — only if the user specified any
  const colorLines: string[] = [];
  if (data.mainColors && data.secondaryColors) {
    colorLines.push(`Use the dominant colors ${data.mainColors} and ${data.secondaryColors}.`);
  } else if (data.mainColors) {
    colorLines.push(`Use the dominant color ${data.mainColors}.`);
  } else if (data.secondaryColors) {
    colorLines.push(`Use accent color ${data.secondaryColors}.`);
  }
  if (data.moodColors) colorLines.push(`Color mood: ${data.moodColors}.`);
  if (data.style) colorLines.push(`Design style: ${data.style}.`);
  if (colorLines.length > 0) parts.push('\n' + colorLines.join('\n'));

  // 4. Business info — only if provided
  const bizLines: string[] = [];
  if (data.businessName) bizLines.push(`Business Name: ${data.businessName}`);
  if (data.businessType) bizLines.push(`Business Type: ${data.businessType}`);
  if (bizLines.length > 0) parts.push('\n' + bizLines.join('\n'));

  // 5. Text content — only if provided
  const textLines: string[] = [];
  if (data.mainText) textLines.push(`Large main text: ${data.mainText}.`);
  if (data.tagline) textLines.push(`Tagline: ${data.tagline}.`);
  if (data.alignText) textLines.push(`Main text placement: ${data.alignText}.`);
  if (data.fontStyle) textLines.push(`Use the font style ${data.fontStyle}.`);
  if (textLines.length > 0) parts.push('\n' + textLines.join('\n'));

  // 6. AI permissions — always include since they are explicit toggles
  parts.push(`\nAI ${data.allowAiText ? 'allowed' : 'not allowed'} adds relevant supporting/promotional text to make the design more attractive.`);
  parts.push(`AI ${data.allowAiPhotos ? 'allowed' : 'not allowed'} adds relevant supporting/promotional photos to make the design more attractive.`);

  // 7. Quality footer — always include
  parts.push(`\nCreate a clean, attractive layout that is easy to read from a distance, has a balanced composition, contrasting colors, and is suitable for promotional purposes.`);
  parts.push(`\nUltra HD 8K, highly detailed, sharp focus, crisp typography, clean vector-like edges, professional print quality, high contrast, ultra-sharp details, readable text, no blur, no distorted text, clean composition, no messy elements, print-ready quality.`);

  // 8. Additional notes — only if provided
  if (data.additionalNotes) {
    parts.push(`\nAdditional Notes: ${data.additionalNotes}`);
  }

  return parts.join('\n');
}

export function buildNegativePrompt(): string {
  return 'blurry, low quality, pixelated, watermark, text errors, misspelling, bad typography, amateur design, cluttered layout, distorted proportions, ugly colors, noisy, artifacts';
}
