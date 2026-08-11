'use client';

import { useId } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/Button';
import { Meta } from '@/components/ui/Meta';
import { cn } from '@/lib/cn';

export const FIELD =
  'w-full border-0 border-b border-[var(--rule)] bg-transparent pb-3 pt-1 font-[family-name:var(--font-body)] text-[length:calc(1.15rem+0.4*var(--type-step))] font-light leading-[1.6] text-[var(--fg)] outline-none transition-colors duration-300 focus:border-[var(--accent)]';

export function Field({
  label,
  name,
  type = 'text',
  error,
  required = true,
  autoComplete,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
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
    className: cn(FIELD, rows && 'resize-y leading-[1.7]', error && 'border-[var(--accent)]'),
  };

  return (
    <div className="flex flex-col gap-3">
      <Meta as="span" muted>
        <label htmlFor={id}>
          {label}
          {required ? <span aria-hidden> *</span> : null}
        </label>
      </Meta>

      {rows ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}

      {error ? (
        <p id={errorId} className="text-[0.85rem] leading-[1.6]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SubmitButton({ send, sending }: { send: string; sending: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} arrow className="w-full sm:w-auto">
      {pending ? sending : send}
    </Button>
  );
}
