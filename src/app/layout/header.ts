import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HoursService } from '../core/hours.service';
import { SITE } from '../core/site.config';
import { Logo } from './logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    <header class="header" [class.scrolled]="scrolled()">
      <div class="container bar">
        <a routerLink="/" class="logo" aria-label="Tony's Pizza & Subs home" (click)="close()">
          <app-logo />
        </a>

        <nav class="nav" [class.open]="menuOpen()" aria-label="Main">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" routerLinkActive="active" (click)="close()">{{ l.label }}</a>
          }
          <div class="nav-status">
            <span class="dot" [class.on]="hours.status().open"></span>{{ hours.status().text }}
          </div>
        </nav>

        <div class="actions">
          <a class="phone" [href]="site.phoneHref">{{ site.phone }}</a>
          <a class="btn btn--primary btn--sm" [href]="site.order.url" target="_blank" rel="noopener" (click)="close()">Order Online<span class="sr-only"> (opens in a new tab)</span></a>
          <button
            type="button"
            class="burger"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Toggle menu"
            (click)="menuOpen.set(!menuOpen())"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgb(26 23 20 / 92%);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--line);
      transition: box-shadow 0.35s var(--ease), background-color 0.35s var(--ease);
      view-transition-name: site-header;
    }
    .header.scrolled { background: rgb(26 23 20 / 98%); box-shadow: 0 8px 28px rgb(0 0 0 / 40%); }
    .bar { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; height: var(--header-h); }
    .logo { --logo-h: calc(var(--header-h) - 16px); display: flex; align-items: center; text-decoration: none; white-space: nowrap; }
    .nav { display: flex; align-items: center; gap: 0.25rem; }
    .nav a {
      position: relative;
      padding: 0.5rem 0.875rem;
      border-radius: 3px;
      font-size: 0.9375rem;
      font-weight: 500;
      text-decoration: none;
      white-space: nowrap;
      color: var(--ink-soft);
      transition: color 0.2s var(--ease);
    }
    .nav a::after {
      content: '';
      position: absolute;
      left: 0.875rem;
      right: 0.875rem;
      bottom: 0.2rem;
      height: 2px;
      background: var(--red-text);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s var(--ease);
    }
    .nav a:hover { color: var(--white); }
    .nav a:hover::after,
    .nav a.active::after { transform: scaleX(1); }
    .nav a.active { color: var(--white); font-weight: 600; }
    .nav-status { display: none; }
    .actions { display: flex; align-items: center; gap: 1rem; }
    .actions .btn { white-space: nowrap; }
    .phone { font-size: 0.9375rem; font-weight: 600; text-decoration: none; white-space: nowrap; }
    .phone:hover { color: var(--red-text); }
    .burger { display: none; }
    .dot { display: inline-block; width: 8px; height: 8px; margin-right: 0.5rem; border-radius: 50%; background: #a8a29a; }
    .dot.on { background: #22a55b; animation: pulse 2.4s ease-out infinite; }

    @media (max-width: 1279px) {
      .phone { display: none; }
    }

    @media (max-width: 1049px) {
      .burger {
        display: grid;
        place-content: center;
        gap: 5px;
        width: 44px;
        height: 44px;
        padding: 0;
        border: 1px solid var(--line);
        border-radius: 3px;
        background: var(--surface);
        cursor: pointer;
      }
      .burger span { width: 18px; height: 2px; background: var(--text); transition: transform 0.35s var(--ease), opacity 0.2s; }
      .burger[aria-expanded='true'] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      .burger[aria-expanded='true'] span:nth-child(2) { opacity: 0; }
      .burger[aria-expanded='true'] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      .nav {
        position: absolute;
        top: var(--header-h);
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 0.75rem 1.25rem 1.25rem;
        background: var(--surface);
        border-bottom: 1px solid var(--line);
        box-shadow: var(--shadow);
        visibility: hidden;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: opacity 0.25s var(--ease), transform 0.4s var(--ease), visibility 0s linear 0.4s;
      }
      .nav.open {
        visibility: visible;
        opacity: 1;
        transform: none;
        pointer-events: auto;
        transition-delay: 0s;
      }
      .nav a { padding: 0.875rem 0.5rem; border-radius: 0; border-bottom: 1px solid var(--line); font-size: 1.0625rem; }
      .nav a::after { display: none; }
      .nav a.active { color: var(--red-text); }
      .nav-status { display: block; padding-top: 1rem; font-size: 0.875rem; color: var(--muted); }
    }

    @media (max-width: 479px) {
      .actions { gap: 0.5rem; }
    }

    @media (max-width: 767px) {
      .actions .btn { display: none; }
    }
  `,
})
export class Header {
  protected readonly site = SITE;
  protected readonly hours = inject(HoursService);
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly links = [
    { path: '/menu', label: 'Menu' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/visit', label: 'Hours & Location' },
    { path: '/contact', label: 'Catering' },
    { path: '/careers', label: 'Careers' },
  ];

  protected close(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
