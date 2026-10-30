import { Component, ElementRef, HostListener, OnDestroy, inject, signal } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { GALLERY } from '../../data/gallery.data';

@Component({
  selector: 'app-gallery',
  imports: [Reveal],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnDestroy {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private opener: HTMLElement | null = null;

  protected readonly images = GALLERY;
  protected readonly current = signal<number | null>(null);

  protected open(i: number): void {
    this.opener = document.activeElement as HTMLElement | null;
    this.current.set(i);
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.host.querySelector<HTMLElement>('.lb-btn.close')?.focus());
  }

  protected close(): void {
    this.current.set(null);
    document.body.style.overflow = '';
    this.opener?.focus();
  }

  protected step(delta: number): void {
    const i = this.current();
    if (i === null) return;
    this.current.set((i + delta + this.images.length) % this.images.length);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(e: KeyboardEvent): void {
    if (this.current() === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
    if (e.key === 'Tab') {
      // Keep focus inside the open viewer.
      const controls = Array.from(this.host.querySelectorAll<HTMLElement>('.lightbox .lb-btn'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      else if (!controls.includes(active as HTMLElement)) { e.preventDefault(); first.focus(); }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
