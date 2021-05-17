import { UserConfig, SSRConfig } from './types';
export declare const serverSideTranslations: (initialLocale: string, namespacesRequired?: string[], userConfig?: UserConfig | null) => Promise<SSRConfig>;
