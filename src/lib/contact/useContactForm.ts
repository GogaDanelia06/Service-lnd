'use client';

import { useCallback, useMemo, useState } from 'react';

import { contactSchema, type ValidationMessages } from './schema';
import type { ContactField } from './state';

type Errors = Partial<Record<ContactField, string>>;
type Touched = Partial<Record<ContactField, boolean>>;

const FIELDS: ContactField[] = ['firstName', 'lastName', 'email', 'phone', 'subject', 'message'];

export function useContactForm(messages: ValidationMessages) {
  const schema = useMemo(() => contactSchema(messages), [messages]);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const check = useCallback(
    (name: ContactField, value: string) => {
      const result = schema.shape[name].safeParse(value);
      return result.success ? undefined : result.error.issues[0]?.message;
    },
    [schema],
  );

  const validateField = useCallback(
    (name: ContactField, value: string) => {
      setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
    },
    [check],
  );

  const touchField = useCallback((name: ContactField) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const validateAll = useCallback(
    (form: HTMLFormElement) => {
      const next: Errors = {};
      let first: ContactField | undefined;

      for (const name of FIELDS) {
        const el = form.elements.namedItem(name);
        const value =
          el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement ? el.value : '';
        const message = check(name, value);
        if (message) {
          next[name] = message;
          first = first ?? name;
        }
      }

      setErrors(next);
      setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));
      return first;
    },
    [check],
  );

  const errorFor = useCallback(
    (name: ContactField, serverError?: string) =>
      (touched[name] ? errors[name] : undefined) ?? serverError,
    [errors, touched],
  );

  return { errorFor, validateField, touchField, validateAll };
}
