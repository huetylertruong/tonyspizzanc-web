import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HoursService } from '../../core/hours.service';
import { Reveal } from '../../core/reveal';
import { HOURS, SITE, formatHour } from '../../core/site.config';

@Component({
  selector: 'app-visit',
  imports: [Reveal],
  templateUrl: './visit.html',
  styleUrl: './visit.scss',
})
export class Visit {
  protected readonly site = SITE;
  protected readonly hoursService = inject(HoursService);
  protected readonly hours = HOURS.map((h) => ({ ...h, label: `${formatHour(h.open)} – ${formatHour(h.close)}` }));
  // Constant first-party URL built from SITE, so bypassing sanitization is safe here.
  protected readonly mapUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(SITE.mapsEmbedUrl);
}
