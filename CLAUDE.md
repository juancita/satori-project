# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Satori** is a React + Vite web application for an online clothing store. It's a demo/MVP that showcases a product catalog with WhatsApp integration for order inquiries. The app is client-side only with no backend—products are stored in a JSON file.

### Tech Stack

- **React 18** with Vite for fast builds and HMR
- **React Router v6** for navigation
- **CSS Modules/scoped**: Each component/page has its own .css file for styling
- **Environment variables**: Managed via `.env` (gitignored) for WhatsApp number and store config

## Common Commands

```bash
# Development server (runs on http://localhost:5173)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview built app locally
npm run preview

# Run linter (if eslint is added)
npm run lint
```

## Architecture & Structure

### Pages (Views)
- **`src/pages/Inicio.jsx`** — Hero landing page with featured sections and WhatsApp CTA
- **`src/pages/Catalogo.jsx`** — Product grid with client-side search/filter
- **`src/pages/DetalleProducto.jsx`** — Single product detail page with size/color selectors

### Components (Reusable)
- **`Navbar.jsx`** — Sticky navigation bar
- **`BotonWhatsApp.jsx`** — Reusable WhatsApp link generator; takes a product object and encodes it into a message
- **`TarjetaProducto.jsx`** — Product card shown in catalog grid

### Data Layer
- **`src/data/productos.json`** — Single source of truth for all products; each product has `id`, `nombre`, `descripcion`, `precio`, `imagen`, `talles[]`, `colores[]`, `detalles`
- **No API calls**: All data is static. To add products, edit this JSON file.

### Styling
- **Global**: `src/index.css` (resets, typography, utility classes)
- **Per-component**: Each component/page has a dedicated `.css` file with scoped class names (e.g., `.navbar`, `.tarjeta-producto`)
- **No CSS-in-JS or Tailwind**: Keep it simple; vanilla CSS with BEM-ish naming

## Key Design Patterns

### WhatsApp Integration
The `BotonWhatsApp` component generates WhatsApp links with pre-filled messages. It reads `VITE_WHATSAPP_NUMBER` from `.env` and constructs a `https://wa.me/` URL with the product details (name, size, color, price) in the message body. Any page can use this component—pass a product object or leave empty for a generic message.

### Product Selection on Detail Page
`DetalleProducto.jsx` uses local React state to track selected size/color; these are bundled into `productoConSelecciones` and passed to the WhatsApp button so the message includes the exact variant the user chose.

### Client-Side Search
`Catalogo.jsx` filters products by name/description in real-time as the user types; no backend query.

## Important Notes

### Environment Variables
- **`.env`** (gitignored) — Your actual config. Update `VITE_WHATSAPP_NUMBER` with the real number (format: country code + number, no hyphens).
- **`.env.example`** — Template for the repo; should match `.env` structure but with placeholder values.
- At build time, all `VITE_*` vars are inlined into the bundle (Vite behavior). No runtime config.

### Images
- Currently uses placeholder images from `https://via.placeholder.com`. In `productos.json`, replace the `imagen` URL with real product images (local paths like `/img/remera.jpg` in `public/`, or external CDN URLs).
- `public/` folder is served as-is; put static assets there.

### Adding New Products
1. Edit `src/data/productos.json` — add a new object with unique `id`, `nombre`, `precio`, etc.
2. Include `talles[]` and `colores[]` arrays so the detail page can show selectors.
3. Update the `imagen` URL (or use the placeholder).
4. No restart needed; Vite will hot-reload.

### Adding New Pages
1. Create `src/pages/NuevaPage.jsx` and `src/pages/NuevaPage.css`.
2. Import in `src/App.jsx` and add a `<Route>` in the `<Routes>` block.
3. Update `Navbar.jsx` if the page should appear in the menu.

## Responsive Design

All CSS uses mobile-first approach with `@media (max-width: 768px)` breakpoints for tablets/mobile. Grid layouts use `auto-fit`/`minmax()` for flexibility. Test changes in the browser DevTools before shipping.

## Future Considerations

- **Tests**: Not set up yet. If needed, use Vitest (Vite-native) or Jest + React Testing Library.
- **Linting**: ESLint not configured. Add if team standards require it.
- **Backend**: Currently N/A. If you add a real database/auth later, create `src/api/` folder and use fetch or a client library (axios, etc.).
- **Deployment**: Build runs `vite build`. Deploy `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).
