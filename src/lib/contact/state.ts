export type ContactField = 'firstName' | 'lastName' | 'email' | 'phone' | 'subject' | 'message';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: 'idle' };
