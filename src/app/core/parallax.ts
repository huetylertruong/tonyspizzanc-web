import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, input } from '@angular/core';

/** Shifts the element vertically as its parent scrolls past, so it trails the content. Value is the travel as a fraction of the parent's height. */
@Directive({ selector: '[appParallax]' })
export class Parallax implements OnInit, OnDestroy {
  readonly appParallax = input<number | string>(0.15);

  private readonly node: HTMLElement = inject(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private frame = 0;
  private listening = false;

  ngOnInit(): void {
    const parent = this.node.parentElement;
    if (!parent || typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.node.style.willChange = 'transform';
    this.observer = new IntersectionObserver(([entry]) => this.toggle(entry.isIntersecting), { rootMargin: '100px 0px' });
    this.observer.observe(parent);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.toggle(false);
  }

  private readonly onScroll = (): void => {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.update();
    });
  };

  private toggle(visible: boolean): void {
    if (visible === this.listening) return;
    this.listening = visible;
    // Scroll work stays outside Angular so it never triggers change detection.
    this.zone.runOutsideAngular(() => {
      const method = visible ? 'addEventListener' : 'removeEventListener';
      window[method]('scroll', this.onScroll, { passive: true });
      window[method]('resize', this.onScroll, { passive: true });
    });
    if (visible) this.update();
  }

  private update(): void {
    const parent = this.node.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const half = window.innerHeight / 2;
    // -1 when the parent is fully above the viewport centre, +1 when fully below.
    const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - half) / (half + rect.height / 2)));
    const travel = -progress * rect.height * (Number(this.appParallax()) || 0);
    this.node.style.transform = `translate3d(0, ${travel.toFixed(1)}px, 0)`;
  }
}
