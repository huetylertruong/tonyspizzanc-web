import { Routes } from '@angular/router';

const SUFFIX = "Tony's Pizza & Subs";

export const routes: Routes = [
  {
    path: '',
    title: `${SUFFIX} | Statesville, NC`,
    data: { description: 'Fresh dough, homemade sauces and made-to-order pizza, subs, pasta and wings in Statesville, NC. Pick-up and delivery. Order online or call (704) 380-4544.' },
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'menu',
    title: `Menu | ${SUFFIX}`,
    data: { description: "See the full Tony's Pizza & Subs menu: specialty and build-your-own pizzas, stromboli, subs, pasta, wings, salads, breadsticks, desserts and catering trays." },
    loadComponent: () => import('./pages/menu/menu').then((m) => m.Menu),
  },
  {
    path: 'gallery',
    title: `Gallery | ${SUFFIX}`,
    data: { description: "Photos of the pizzas, stromboli, wings, subs and more coming out of the kitchen at Tony's Pizza & Subs in Statesville, NC." },
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
  },
  {
    path: 'visit',
    title: `Hours & Location | ${SUFFIX}`,
    data: { description: "Find Tony's Pizza & Subs at 538 Turnersburg Hwy, Suite D, Statesville, NC 28625. Open daily; call (704) 380-4544 for pick-up or delivery." },
    loadComponent: () => import('./pages/visit/visit').then((m) => m.Visit),
  },
  {
    path: 'contact',
    title: `Contact & Catering | ${SUFFIX}`,
    data: { description: "Planning a party or event? Request catering from Tony's Pizza & Subs in Statesville, NC, or send us your feedback, comments and compliments." },
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'careers',
    title: `Join Our Team | ${SUFFIX}`,
    data: { description: "Now hiring at Tony's Pizza & Subs in Statesville, NC: customer service, kitchen, delivery drivers and shift managers. Apply online." },
    loadComponent: () => import('./pages/careers/careers').then((m) => m.Careers),
  },
  {
    path: '**',
    title: `Page not found | ${SUFFIX}`,
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
