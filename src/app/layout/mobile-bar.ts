import { Component } from '@angular/core';
import { SITE } from '../core/site.config';

@Component({
  selector: 'app-mobile-bar',
  template: `
    <nav class="bar" aria-label="Quick actions">
      <a class="btn btn--outline" [href]="site.phoneHref">Call</a>
      <a class="btn btn--primary" [href]="site.order.url" target="_blank" rel="noopener">Order Online<span class="sr-only"> (opens in a new tab)</span></a>
    </nav>
  `,
  styles: `
    .bar {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 90;
      display: none;
      grid-template-columns: 1fr 2fr;
      gap: 0.75rem;
      padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
      background: var(--surface);
      border-top: 1px solid var(--line);
      box-shadow: 0 -4px 16px rgb(0 0 0 / 30%);
      animation: bar-in 0.7s var(--ease) 0.8s both;
    }
    @keyframes bar-in {
      from { transform: translateY(100%); }
      to { transform: none; }
    }
    @media (max-width: 767px) {
      .bar { display: grid; }
    }
  `,
})
export class MobileBar {
  protected readonly site = SITE;
}
