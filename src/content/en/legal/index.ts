import type { LegalPage } from '@/content/types';

import { dataProtection } from '@/content/en/legal/data-protection';
import { privacy } from '@/content/en/legal/privacy';
import { terms } from '@/content/en/legal/terms';

export const legal: LegalPage[] = [terms, privacy, dataProtection];
