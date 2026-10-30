# Tony's Pizza & Subs – Website

Angular 20 (standalone components, lazy routes, SCSS) replacement for the Squarespace site.

## Commands

- `npm start` – dev server at http://localhost:4200
- `npm run build` – production build in `dist/tonyspizza-web`

## Where to edit

- `src/app/core/site.config.ts` – phone, address, hours, online-ordering URL (opens in a new tab), form endpoint
- `src/app/pages/menu/menu.ts` – the menu page shows `public/images/menu-1.jpg` and `menu-0.jpg`; replace those files to update the menu
- `src/app/data/gallery.data.ts` – gallery photos
- `public/images/` – photos
- `src/styles.scss` – colors, fonts and shared styles (design tokens at the top)

## Forms

Contact and Careers forms post JSON to `SITE.formEndpoint`. While it is empty, submissions are simulated.
Set it to a Formspree/Netlify/own API URL to receive real submissions.

## Before launch

- Hosting must rewrite unknown paths to `index.html` (single-page app), or links like `/menu` will 404 on refresh.
- Set `formEndpoint` in `site.config.ts` so the Contact and Careers forms actually deliver.
- Once the domain is known, make the `og:image` in `src/index.html` an absolute URL and add a canonical link and sitemap.
