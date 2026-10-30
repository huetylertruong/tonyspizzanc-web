import { Injectable } from '@angular/core';
import { SITE } from './site.config';

@Injectable({ providedIn: 'root' })
export class FormSubmitService {
  async submit(formName: string, values: Record<string, unknown>): Promise<void> {
    if (!SITE.formEndpoint) {
      // No endpoint configured yet: simulate a successful send so the UI can be reviewed.
      await new Promise((resolve) => setTimeout(resolve, 600));
      return;
    }
    const res = await fetch(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ form: formName, ...values }),
    });
    if (!res.ok) {
      throw new Error(`Form submission failed (${res.status})`);
    }
  }
}
