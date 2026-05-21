# BannerKit

BannerKit is an AI prompt generator for creating business banner and poster designs. It helps small businesses prepare structured, production-ready prompts for image generation tools such as ChatGPT Image, Midjourney, Flux, Stable Diffusion, and other design AI platforms.

The app guides users through business details, visual style, colors, typography, banner size, text placement, and optional AI-generated supporting assets. It then produces a polished English prompt that can be copied directly into an AI image generator.

## Features

- Generate professional prompts for banners and posters
- Customize business name, business type, headline, tagline, size, ratio, colors, style, and mood
- Control whether AI may add supporting text or extra photo assets
- Create a negative prompt to reduce unwanted output
- Copy prompts quickly for use in popular AI image tools
- Light and dark theme support
- Built for Indonesian UMKM and small business promotion workflows

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- React Hot Toast

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Runs the production server after building.

```bash
npm run lint
```

Runs ESLint checks.

## Deployment

This project is ready to deploy on Vercel.

Recommended Vercel settings:

- Framework Preset: Next.js
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: default Next.js output

To deploy with the Vercel CLI:

```bash
npx vercel@latest
```

For production deployment:

```bash
npx vercel@latest --prod
```

## Project Purpose

BannerKit is designed to make AI-assisted promotional design easier for small businesses. Instead of writing design prompts from scratch, users can fill in simple business and design details, then receive a complete prompt with clear layout, visual direction, typography, color, and print-resolution instructions.
