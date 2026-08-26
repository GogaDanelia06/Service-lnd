'use client';

import { useId } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const FIELD =
  'w-full border bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] px-3 py-2.5 font-[family-name:var(--font-body)] text-base font-light leading-[1.6] text-[var(--fg)] outline-none';

export function Field({
  label,
  name,
  type = 'text',
  error,
  required = true,
  requiredLabel,
  autoComplete,
  rows,
  defaultValue,
  onBlur,
  onInput,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  requiredLabel: string;
  autoComplete?: string;
  rows?: number;
  defaultValue?: string;
  onBlur?: (name: string, value: string) => void;
  onInput?: (name: string, value: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  const shared = {
    id,
    name,
    required,
    defaultValue,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onBlur?.(name, e.currentTarget.value),
    onInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onInput?.(name, e.currentTarget.value),
    className: cn(
      FIELD,
      rows && 'resize-y leading-[1.7]',
      error ? 'border-[var(--alert)]' : 'border-[var(--fg)]',
    ),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-light">
        {label}
        {required ? (
          <span aria-hidden title={requiredLabel} className="text-[var(--alert)]">
            {' '}*
          </span>
        ) : null}
      </label>

      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} type={type} autoComplete={autoComplete} />}

      <p
        id={errorId}
        aria-live="polite"
        className="empty:hidden text-[0.85rem] leading-[1.4] text-[var(--alert)]"
      >
        {error ?? ''}
      </p>
    </div>
  );
}

export function SubmitButton({ send, sending }: { send: string; sending: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="btn-reverse">
      {pending ? sending : send}
    </Button>
  );
}
