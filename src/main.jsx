import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store";
import { I18nextProvider } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import i18n from "./i18n/index.js";

import "./index.css";
import App from "./App.jsx";

import axios from "axios";

axios.interceptors.request.use((config) => {
    if (!config.headers["client-id"]) {
        config.headers["client-id"] = import.meta.env.CLIENTID;
    }
    if (!config.headers["client-secret"]) {
        config.headers["client-secret"] = import.meta.env.CLIENTSECRET;
    }
    return config;
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <HelmetProvider>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <Provider store={store}>
                    <I18nextProvider i18n={i18n}>
                        <App />
                    </I18nextProvider>
                </Provider>
            </GoogleOAuthProvider>
        </HelmetProvider>
    </BrowserRouter>
);
