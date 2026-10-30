import { Injectable, computed, signal } from '@angular/core';
import { HOURS, SITE, formatHour } from './site.config';

@Injectable({ providedIn: 'root' })
export class HoursService {
  private readonly now = signal(new Date());

  constructor() {
    setInterval(() => this.now.set(new Date()), 60_000);
  }

  readonly today = computed(() => this.clock().day);

  readonly status = computed(() => {
    const { day, minutes } = this.clock();
    const today = HOURS[day];
    const openMin = today.open * 60;
    const closeMin = today.close * 60;

    if (minutes >= openMin && minutes < closeMin) {
      return { open: true, text: `Open now · until ${formatHour(today.close)}` };
    }
    if (minutes < openMin) {
      return { open: false, text: `Closed · opens today at ${formatHour(today.open)}` };
    }
    const tomorrow = HOURS[(day + 1) % 7];
    return { open: false, text: `Closed · opens ${tomorrow.short} at ${formatHour(tomorrow.open)}` };
  });

  private readonly clock = computed(() => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: SITE.timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(this.now());
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    const day = HOURS.findIndex((h) => h.short === get('weekday'));
    return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
  });
}
