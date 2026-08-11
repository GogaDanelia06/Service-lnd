'use client';

import { useActionState } from 'react';

import { Field, SubmitButton } from '@/components/contact/Fields';
import { submitContact } from '@/lib/contact/actions';
import { initialContactState } from '@/lib/contact/state';

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
};

export function ContactForm({ labels, locale }: { labels: FormLabels; locale: string }) {
  const [state, formAction] = useActionState(submitContact, initialContactState);

  if (state.status === 'success') {
    return (
      <div role="status" className="prose-utica">
        <h4>{labels.sent}</h4>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="locale" value={locale} />

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-base font-light">{labels.name}</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label={labels.firstName}
            name="firstName"
            autoComplete="given-name"
            requiredLabel={labels.required}
            error={state.fieldErrors?.firstName}
          />
          <Field
            label={labels.lastName}
            name="lastName"
            autoComplete="family-name"
            requiredLabel={labels.required}
            error={state.fieldErrors?.lastName}
          />
        </div>
      </fieldset>

      <Field
        label={labels.email}
        name="email"
        type="email"
        autoComplete="email"
        requiredLabel={labels.required}
        error={state.fieldErrors?.email}
      />

      <Field
        label={labels.subject}
        name="subject"
        required={false}
        requiredLabel={labels.required}
        error={state.fieldErrors?.subject}
      />

      <Field
        label={labels.message}
        name="message"
        rows={5}
        requiredLabel={labels.required}
        error={state.fieldErrors?.message}
      />

      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="contact-company">{labels.company}</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-[0.9rem] leading-[1.8]">
          {state.message}
        </p>
      ) : null}

      <div>
        <SubmitButton send={labels.send} sending={labels.sending} />
      </div>
    </form>
  );
}
