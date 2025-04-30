import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import en from "./en.json";
import uz from "./uz.json";
import ru from "./ru.json";

i18n.use(initReactI18next)
    .use(detector)
    .init({
        resources: {
            en: { translation: en },
            uz: { translation: uz },
            ru: { translation: ru },
        },
        pluralSeparator: "_",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
