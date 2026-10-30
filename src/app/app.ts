import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Header } from './layout/header';
import { Footer } from './layout/footer';
import { MobileBar } from './layout/mobile-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MobileBar],
  template: `
    <a class="skip-link" href="#main" (click)="skipToContent($event)">Skip to content</a>
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-mobile-bar />
  `,
  styles: `
    :host { display: block; }
    main { min-height: 60vh; outline: none; }
    @media (max-width: 767px) {
      :host { padding-bottom: 72px; }
    }
  `,
})
export class App {
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    const router = inject(Router);
    let first = true;

    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => {
        let leaf = this.route.snapshot;
        while (leaf.firstChild) leaf = leaf.firstChild;
        const description = leaf.data['description'] as string | undefined;
        if (description) {
          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ property: 'og:description', content: description });
        }
        // Move focus to the new page's content so keyboard and screen-reader users start there, not on the old link.
        if (!first) document.getElementById('main')?.focus({ preventScroll: true });
        first = false;
      });
  }

  // A bare "#main" link would resolve against <base href="/"> and reload the home page.
  protected skipToContent(event: Event): void {
    event.preventDefault();
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  }
}
