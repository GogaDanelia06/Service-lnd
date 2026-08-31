import type { LegalPage } from '@/content/types';

import { dataProtection } from '@/content/ka/legal/data-protection';
import { privacy } from '@/content/ka/legal/privacy';
import { terms } from '@/content/ka/legal/terms';

export const legal: LegalPage[] = [terms, privacy, dataProtection];
