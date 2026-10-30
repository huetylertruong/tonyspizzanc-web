import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormSubmitService } from '../../core/form-submit.service';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly submitter = inject(FormSubmitService);

  protected readonly site = SITE;
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

  protected readonly topics = ['Catering / party', 'Feedback or compliment', 'General question'];

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    topic: [this.topics[0], Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected async send(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    try {
      await this.submitter.submit('contact', this.form.getRawValue());
      this.status.set('sent');
      this.form.reset({ topic: this.topics[0] });
    } catch {
      this.status.set('error');
    }
  }
}
