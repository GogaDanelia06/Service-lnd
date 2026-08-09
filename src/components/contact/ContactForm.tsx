'use client';

import { useActionState } from 'react';

import { submitContact } from '@/app/contact/actions';
import { initialContactState } from '@/app/contact/state';
import { Field, SubmitButton } from '@/components/contact/Fields';

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  if (state.status === 'success') {
    return (
      <div role="status" className="prose-utica border-t border-[var(--rule)] pt-8">
        <h4>Message sent</h4>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Field
          label="First Name"
          name="firstName"
          autoComplete="given-name"
          error={state.fieldErrors?.firstName}
        />
        <Field
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          error={state.fieldErrors?.lastName}
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={state.fieldErrors?.email}
      />

      <Field label="Subject" name="subject" required={false} error={state.fieldErrors?.subject} />

      <Field label="Message" name="message" rows={5} error={state.fieldErrors?.message} />

      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-[0.9rem] leading-[1.8]">
          {state.message}
        </p>
      ) : null}

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
