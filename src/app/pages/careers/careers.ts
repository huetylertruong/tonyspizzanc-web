import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSubmitService } from '../../core/form-submit.service';
import { Reveal } from '../../core/reveal';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-careers',
  imports: [ReactiveFormsModule, Reveal],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {
  private readonly fb = inject(FormBuilder);
  private readonly submitter = inject(FormSubmitService);

  protected readonly site = SITE;
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');

  protected readonly positions = ['Customer service / FOH', 'Kitchen', 'Delivery driver', 'Shift manager'];

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s().+-]{10,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    position: ['', Validators.required],
    about: [''],
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
      await this.submitter.submit('careers', this.form.getRawValue());
      this.status.set('sent');
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
