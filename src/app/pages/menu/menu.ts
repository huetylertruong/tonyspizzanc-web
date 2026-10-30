import { Component } from '@angular/core';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-menu',
  imports: [Reveal],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  protected readonly site = SITE;

  protected readonly pages = [
    { src: '/images/menu-1.jpg', alt: "Tony's Pizza & Subs menu, page 1: pizzas, stromboli, wings, salads, breadsticks and desserts" },
    { src: '/images/menu-0.jpg', alt: "Tony's Pizza & Subs menu, page 2: subs, pasta and catering" },
  ];
}
