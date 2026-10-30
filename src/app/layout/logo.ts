import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `<img src="/images/logo.png" alt="Tony's Pizza & Subs" width="480" height="260" />`,
  styles: `
    :host { display: inline-flex; line-height: 0; }
    img { width: auto; height: var(--logo-h, 56px); }
  `,
})
export class Logo {}
