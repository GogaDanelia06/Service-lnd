'use client';

import { useActionState } from 'react';

import { Field, SubmitButton } from '@/components/contact/Fields';
import { submitContact } from '@/lib/contact/actions';
import { initialContactState } from '@/lib/contact/state';
import { useContactForm } from '@/lib/contact/useContactForm';
import type { ContactField } from '@/lib/contact/state';

type FormLabels = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  name: string;
  required: string;
  send: string;
  sending: string;
  sent: string;
  company: string;
  thanks: string;
  checkFields: string;
  deliveryFailed: string;
  errors: {
    firstName: string;
    lastName: string;
    email: string;
    messageShort: string;
    tooLong: string;
  };
};

export function ContactForm({ labels, locale }: { labels: FormLabels; locale: string }) {
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const { errorFor, validateField, touchField, validateAll } = useContactForm(labels.errors);

  if (state.status === 'success') {
    return (
      <div role="status" className="prose-utica">
        <h4>{labels.sent}</h4>
        <p>{state.message}</p>
      </div>
    );
  }

  const onBlur = (name: string, value: string) => {
    touchField(name as ContactField);
    validateField(name as ContactField, value);
  };

  const onInput = (name: string, value: string) => validateField(name as ContactField, value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const first = validateAll(event.currentTarget);
    if (!first) return;
    event.preventDefault();
    const el = event.currentTarget.elements.namedItem(first);
    if (el instanceof HTMLElement) el.focus();
  };

  const field = (name: ContactField) => ({
    error: errorFor(name, state.fieldErrors?.[name]),
    requiredLabel: labels.required,
    onBlur,
    onInput,
  });

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      <fieldset>
        <legend className="mb-2 text-base font-light">{labels.name}</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={labels.firstName} name="firstName" autoComplete="given-name" {...field('firstName')} />
          <Field label={labels.lastName} name="lastName" autoComplete="family-name" {...field('lastName')} />
        </div>
      </fieldset>

      <Field label={labels.email} name="email" type="email" autoComplete="email" {...field('email')} />
      <Field label={labels.subject} name="subject" required={false} {...field('subject')} />
      <Field label={labels.message} name="message" rows={5} {...field('message')} />

      <div aria-hidden className="h-px w-px overflow-hidden opacity-0">
        <label htmlFor="contact-company">{labels.company}</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-[0.85rem] leading-[1.6] text-[var(--alert)]">
          {state.message}
        </p>
      ) : null}

      <div>
        <SubmitButton send={labels.send} sending={labels.sending} />
      </div>
    </form>
  );
}
