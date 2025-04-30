import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDateForQuery } from "../utils/dateUtils";
import dayjs from "dayjs";

const Footer = () => {
    const { t } = useTranslation();
    const [locations, setLocations] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    const getLocations = async () => {
        try {
            const res = await axios.get(`${url}/location`, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            });
            setLocations(res?.data?.data || []);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useEffect(() => {
        getLocations();
    }, []);

    const getDefaultDates = () => {
        const startDate = new Date();
        const endDate = new Date();
        startDate.setHours(12, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(12, 0, 0, 0);
        return {
            start_date: formatDateForQuery(startDate),
            end_date: formatDateForQuery(endDate)
        };
    };

    const popularDestinations = locations.slice(0, 4).map((option) => option.city);
    const defaultDates = getDefaultDates();

    return (
        <footer className="bg-white">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Link to="/" className="text-xl font-semibold text-gray-900">
                            ShadowManga
                        </Link>
                        <p className="text-gray-600 text-sm">
                            {t("A hotel booking website enables users to search, compare, and reserve hotel rooms online, offering a seamless, user-friendly platform for finding the best deals and accommodations.")}
                        </p>
                    </div>

                    {/* Popular Destinations */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">{t("Popular Destinations")}</h3>
                        <div className="flex flex-col space-y-2">
                            {popularDestinations.map((city) => (
                                <Link 
                                    key={city}
                                    to={`/search?city=${city}&start_date=${defaultDates.start_date}&end_date=${defaultDates.end_date}`} 
                                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    {t(`${city} Hotels`)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">{t("Contacts")}</h3>
                        <div className="flex flex-col space-y-2 text-gray-600 text-sm">
                            <p className="leading-relaxed">
                                {t('42, Al-Khorazmi street, Burijar NCA, Chilanzar district, Tashkent')}
                            </p>
                            <a href="mailto:info@shadowmanga.com" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                info@shadowmanga.uz
                            </a>
                            <a href="tel:+998998959090" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                +998 99 895 90 90
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-600 text-sm">
                        © {new Date().getFullYear()} ShadowManga. {t("All Rights Reserved.")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
