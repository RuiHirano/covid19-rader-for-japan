import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import en from './locales/en'
import ja from './locales/ja'

i18n.fallbacks = true
i18n.translations = { en, ja }
i18n.locale = Localization.locale

export default i18n
