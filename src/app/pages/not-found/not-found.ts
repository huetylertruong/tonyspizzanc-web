import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="section section--light">
      <div class="container">
        <span class="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>That page isn't on the menu. Let's get you back to something good.</p>
        <div class="cta">
          <a class="btn btn--primary" routerLink="/">Back home</a>
          <a class="btn btn--dark" routerLink="/menu">View menu</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    p { margin-top: 1rem; color: var(--muted); font-size: 1.125rem; }
    .cta { display: flex; gap: 0.75rem; margin-top: 2rem; }
  `,
})
export class NotFound {}
