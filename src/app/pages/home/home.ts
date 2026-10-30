import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HoursService } from '../../core/hours.service';
import { Parallax } from '../../core/parallax';
import { Reveal } from '../../core/reveal';
import { HOURS, SITE, formatHour } from '../../core/site.config';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Reveal, Parallax],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = SITE;
  protected readonly hoursService = inject(HoursService);

  // pos/origin/zoom frame each photo on the pizza (desktop); the M variants are for the full-bleed phone layout.
  protected readonly slides = [
    { src: '/images/hero-white-pizza.jpg', alt: 'White pizza with tomatoes and spinach', caption: 'White Pizza', pos: '50% 50%', origin: '50% 50%', zoom: 1, originM: '50% 50%', zoomM: 1 },
    { src: '/images/wings.jpg', alt: 'Oven baked wings with hot sauce', caption: 'Oven Baked Wings', pos: '34% 50%', origin: '50% 50%', zoom: 1.1, originM: '50% 50%', zoomM: 1 },
    { src: '/images/the-works-pizza.jpg', alt: 'The Works pizza with pepperoni, sausage, mushrooms and peppers', caption: 'The Works', pos: '50% 74%', origin: '50% 50%', zoom: 1.3, originM: '50% 68%', zoomM: 1.6 },
    { src: '/images/italian-cold-sub.jpg', alt: 'Italian sub cut in half with ham, salami, lettuce and tomato', caption: 'Italian Sub', pos: '28% 50%', origin: '40% 12%', zoom: 1.2, originM: '50% 30%', zoomM: 1 },
    { src: '/images/veggie-deluxe-pizza.jpg', alt: 'Veggie Deluxe pizza with olives, mushrooms and peppers', caption: 'Veggie Deluxe', pos: '50% 57%', origin: '50% 50%', zoom: 1.35, originM: '50% 55%', zoomM: 1.75 },
    { src: '/images/stromboli.jpg', alt: 'Stromboli topped with Parmesan and herbs, with a cup of marinara', caption: 'Stromboli', pos: '50% 36%', origin: '50% 50%', zoom: 1.15, originM: '50% 38%', zoomM: 1.6 },
    { src: '/images/bbq-chicken-pizza.jpg', alt: 'BBQ chicken pizza', caption: 'BBQ Chicken', pos: '50% 59%', origin: '50% 50%', zoom: 1.18, originM: '50% 52%', zoomM: 1.1 },
    { src: '/images/pizza-and-soda.jpg', alt: 'Two pepperoni pizza slices in a box next to a soda', caption: 'Pizza & a Soda', pos: '30% 50%', origin: '50% 50%', zoom: 1, originM: '50% 50%', zoomM: 1 },
    { src: '/images/half-pepperoni-cheese-pizza.jpg', alt: 'Pizza with pepperoni on one half and cheese on the other', caption: 'Pepperoni & Cheese', pos: '50% 64%', origin: '35% 50%', zoom: 1.3, originM: '40% 62%', zoomM: 1.7 },
  ];

  protected readonly slide = signal(0);
  protected readonly reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  protected readonly playing = signal(!this.reducedMotion);

  // Called when the active progress bar finishes filling.
  protected next(): void {
    this.slide.update((i) => (i + 1) % this.slides.length);
  }

  protected go(i: number): void {
    this.slide.set(i);
  }

  protected togglePlay(): void {
    this.playing.update((p) => !p);
  }

  protected readonly todayHours = () => {
    const h = HOURS[this.hoursService.today()];
    return `${formatHour(h.open)} – ${formatHour(h.close)}`;
  };

  protected readonly favorites = [
    { name: 'The Works', image: '/images/the-works-pizza.jpg', alt: 'The Works pizza', text: 'Pepperoni, sausage, beef, ham, mushrooms, onions, green peppers, black olives & extra cheese.' },
    { name: 'Veggie Deluxe', image: '/images/veggie-deluxe-pizza.jpg', alt: 'Veggie Deluxe pizza', text: 'Onion, green peppers, black olives, mushrooms, tomatoes & extra cheese.' },
    { name: 'The Meat', image: '/images/meat-pizza.jpg', alt: 'Meat pizza', text: 'Pepperoni, ham, sausage, beef, bacon & extra cheese.' },
    { name: 'BBQ Chicken', image: '/images/bbq-chicken-pizza.jpg', alt: 'BBQ chicken pizza', text: 'Chicken, bacon, onion, cheddar & Swiss on a BBQ sauce base.' },
    { name: 'Chicken Florentine', image: '/images/chicken-florentine-pizza.jpg', alt: 'Chicken florentine pizza', text: 'Spinach, chicken, onions, Alfredo, Swiss, mozzarella & fresh tomatoes.' },
    { name: 'Cheeseburger Deluxe', image: '/images/cheeseburger-pizza.jpg', alt: 'Cheeseburger pizza', text: 'Beef, bacon, onion, cheddar, tomatoes, Swiss & extra cheese.' },
    { name: 'Meatball Special', image: '/images/meatball-special-pizza.jpg', alt: 'Meatball special pizza', text: 'Meatball, marinara, onion, green peppers, mushrooms & Swiss.' },
    { name: 'Hawaiian', image: '/images/hawaii-pizza.jpg', alt: 'Hawaiian pizza', text: 'Ham, bacon, pineapple & extra cheese.' },
  ];

  protected readonly categories = [
    { name: 'Subs', id: 'subs', note: 'Hot or cold, with chips', image: '/images/italian-cold-sub.jpg', alt: 'Italian sub cut in half', pos: '35% 25%' },
    { name: 'Pasta', id: 'pasta', note: 'Served with 4 garlic knots', image: '/images/breadsticks-box.jpg', alt: 'Breadsticks with marinara' },
    { name: 'Wings', id: 'wings', note: 'Oven baked, golden crisp', image: '/images/wings.jpg', alt: 'Oven baked wings' },
    { name: 'Salads', id: 'salads', note: 'Large or small', image: '/images/garden-salad.jpg', alt: 'House salad' },
  ];
}
