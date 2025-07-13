
# NexoMedix Landing Page

Landing page for NexoMedix, a platform that connects patients with verified health specialists in Mexico. Built with Astro, React, and Tailwind CSS.

## 🚀 Features

- Responsive design for desktop and mobile
- Styled navigation bar with logo and links
- Animated hero, benefits, and purpose sections
- Registration form for specialists with validation and toast notifications
- SEO optimized (Open Graph, Twitter Card, keywords, etc.)
- Vercel Analytics integration

## � Project Structure

```text
/
├── public/
│   ├── favicon.svg
│   ├── logo.ico
│   └── logo.png
├── src/
│   ├── assets/
│   │   ├── astro.svg
│   │   ├── background.svg
│   │   └── fonts/
│   │       ├── Montserrat-Bold.woff2
│   │       ├── Montserrat-Regular.woff2
│   │       └── Montserrat-SemiBold.woff2
│   ├── components/
│   │   ├── Benefits.astro
│   │   ├── Form.tsx
│   │   ├── LandingHero.astro
│   │   ├── Navbar.astro
│   │   ├── Purpose.astro
│   │   └── Toast.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── api/
│   │       └── create-lead.ts
│   ├── services/
│   │   └── supabase.ts
│   └── styles/
│       └── global.css
├── package.json
├── astro.config.mjs
├── tsconfig.json
└── pnpm-lock.yaml
```

## 🧑‍💻 Local Development

Install dependencies and start the dev server:

```sh
pnpm install
pnpm dev
```

Visit [http://localhost:4321](http://localhost:4321) to view the site.

## 🛠️ Build & Deploy

To build for production:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

Deploy to Vercel or your preferred static hosting provider. All static assets (images, icons) must be in the `public/` folder to be served correctly.

## 🌐 SEO & Best Practices

- All meta tags and Open Graph/Twitter tags are set in `Layout.astro`.
- Favicon and logo are referenced from the `public/` folder.
- Uses Montserrat font for branding.

---
Made with ❤️ by the NexoMedix team.
