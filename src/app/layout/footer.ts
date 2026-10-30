import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../core/site.config';
import { Logo } from './logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  template: `
    <footer class="footer tri">
      <div class="container grid">
        <div class="brand">
          <app-logo class="logo" />
          <p>Locally owned and operated. Fresh dough, homemade sauces and dressings, made to order in Statesville.</p>
        </div>

        <div>
          <h2 class="fh">Visit</h2>
          <address>
            {{ site.street }}<br />{{ site.cityLine }}<br />
            <a [href]="site.phoneHref">{{ site.phone }}</a>
          </address>
          <a class="text-link" [href]="site.mapsUrl" target="_blank" rel="noopener">Get directions<span class="sr-only"> (opens in a new tab)</span></a>
        </div>

        <div>
          <h2 class="fh">Hours</h2>
          <ul class="hours">
            <li><span>Mon – Thu</span> 11 AM – 9 PM</li>
            <li><span>Fri – Sat</span> 11 AM – 10 PM</li>
            <li><span>Sunday</span> 11 AM – 8 PM</li>
          </ul>
        </div>

        <div>
          <h2 class="fh">Explore</h2>
          <ul class="links">
            <li><a routerLink="/menu">Menu</a></li>
            <li><a routerLink="/gallery">Gallery</a></li>
            <li><a routerLink="/visit">Hours &amp; Location</a></li>
            <li><a routerLink="/contact">Catering &amp; Contact</a></li>
            <li><a routerLink="/careers">Careers</a></li>
          </ul>
        </div>
      </div>

      <div class="container base">
        <span>&copy; {{ year }} Tony's Pizza &amp; Subs. Prices do not include sales tax. Driver charge may apply.</span>
      </div>
    </footer>
  `,
  styles: `
    .footer { background: var(--ink); color: rgb(255 255 255 / 75%); font-size: 0.9375rem; }
    .grid { display: grid; gap: 2.5rem; padding-block: 4rem 3rem; }
    @media (min-width: 640px) { .grid { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 1000px) { .grid { grid-template-columns: 1.6fr 1fr 1fr 1fr; } }
    .fh { margin-bottom: 1rem; font-size: 1.125rem; letter-spacing: 0.12em; color: var(--white); }
    .logo { --logo-h: 104px; margin-bottom: 1.25rem; }
    .brand p { max-width: 340px; }
    address { margin-bottom: 0.75rem; font-style: normal; }
    a { display: inline-block; padding-block: 0.2rem; color: inherit; text-decoration: none; }
    a:hover { color: var(--white); text-decoration: underline; }
    .text-link { color: #ff8a8e; font-weight: 600; }
    ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 0.25rem; }
    .hours span { display: inline-block; min-width: 5.5rem; color: var(--white); }
    .base { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem 2rem; padding-block: 1.5rem; border-top: 1px solid rgb(255 255 255 / 12%); font-size: 0.8125rem; }
    @media (max-width: 767px) { .footer { padding-bottom: 0.5rem; } }
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
