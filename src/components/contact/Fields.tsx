'use client';

import { useId } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const FIELD =
  'w-full border border-[var(--fg)] bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] px-3 py-2.5 font-[family-name:var(--font-body)] text-base font-light leading-[1.6] text-[var(--fg)] outline-none';

export function Field({
  label,
  name,
  type = 'text',
  error,
  required = true,
  requiredLabel,
  autoComplete,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  requiredLabel: string;
  autoComplete?: string;
  rows?: number;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(FIELD, rows && 'resize-y leading-[1.7]'),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base font-light">
        {label}
        {required ? <span className="text-[var(--muted)]"> ({requiredLabel})</span> : null}
      </label>

      {rows ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}

      {error ? (
        <p id={errorId} className="text-[0.9rem] leading-[1.6]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SubmitButton({ send, sending }: { send: string; sending: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? sending : send}
    </Button>
  );
}
