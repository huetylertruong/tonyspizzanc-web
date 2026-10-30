import { Directive, ElementRef, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Fades and lifts the element in once it scrolls into view. The value is an optional stagger delay in ms. */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnInit, OnDestroy {
  readonly appReveal = input<number | string>(0);

  private readonly node: HTMLElement = inject(ElementRef).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.node.classList.add('reveal');
    this.node.style.setProperty('--reveal-delay', `${Number(this.appReveal()) || 0}ms`);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.node.classList.add('is-visible');
        this.observer?.disconnect();
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    this.observer.observe(this.node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
