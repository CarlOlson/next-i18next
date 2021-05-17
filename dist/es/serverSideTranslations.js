import { createConfig } from './config/createConfig';
import createClient from './createClient';
export const serverSideTranslations = async (initialLocale, namespacesRequired = [], userConfig = null) => {
  if (typeof initialLocale !== 'string') {
    throw new Error('Initial locale argument was not passed into serverSideTranslations');
  }

  if (userConfig === null) {
    throw new Error('next-i18next was unable to find a user config');
  }

  const config = createConfig({ ...userConfig,
    lng: initialLocale
  });
  const {
    i18n,
    initPromise
  } = createClient({ ...config,
    lng: initialLocale
  });
  await initPromise;
  const initialI18nStore = {};
  config.locales.forEach(lng => {
    initialI18nStore[lng] = {};
  });
  namespacesRequired.forEach(ns => {
    for (const locale in initialI18nStore) {
      initialI18nStore[locale][ns] = (i18n.services.resourceStore.data[locale] || {})[ns] || {};
    }
  });
  return {
    _nextI18Next: {
      initialI18nStore,
      initialLocale,
      userConfig: config.serializeConfig ? userConfig : null
    }
  };
};