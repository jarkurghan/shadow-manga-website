import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate("/"), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center  h-[28rem] bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
                <h1 className="text-4xl font-bold text-gray-700 mb-4">404</h1>
                <h2 className="text-xl font-semibold text-gray-600 mb-2">{t("Page Not Found")}</h2>
                <p className="text-gray-500 mb-6">{t("Sorry, the page you are looking for does not exist. Redirecting to main page")}</p>
                <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                    {t("Go Back")}
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
