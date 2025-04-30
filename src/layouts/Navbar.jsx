import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import Button from "../components/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langMenuRef = useRef(null);
  const mobileLangMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = Cookies.get("token");
  const image = Cookies.get("picture_url");
  const name = Cookies.get("name");

  const isLandingPage = location.pathname === "/";

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsLangOpen(false); // Close language menu when toggling main menu
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "uz", label: "UZ" },
    { code: "ru", label: "RU" },
  ];

  const onLogOut = () => {
    localStorage.clear();
    Cookies.remove("token");
    Cookies.remove("picture_url");
    Cookies.remove("name");
    Cookies.remove("user");
    Cookies.remove("authProvider");

    navigate("/", { replace: true });
  };

  const onLogIn = () => {
    navigate("/login", {
      state: { from: location.pathname + location.search },
    });
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickOutsideMobileMenu =
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target);
      const isClickOutsideMobileLang =
        mobileLangMenuRef.current &&
        !mobileLangMenuRef.current.contains(event.target);
      const isClickOutsideDesktopLang =
        langMenuRef.current && !langMenuRef.current.contains(event.target);

      if (isClickOutsideDesktopLang) {
        setIsLangOpen(false);
      }

      if (isClickOutsideMobileLang) {
        setIsMobileLangOpen(false);
      }

      if (isClickOutsideMobileMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === i18n.language)?.label || "EN";
  };

  const handleLanguageChange = (code) => {
    try {
      i18n.changeLanguage(code);
      Cookies.set("i18next", code);
      // Close menus after successful language change
      setIsLangOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Language change failed:", error);
    }
  };

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`${
        isLandingPage ? "fixed" : "sticky"
      } top-0 left-0 right-0 z-50 px-4 py-4`}
    >
      <nav
        className={`mx-auto rounded-2xl transition-all duration-300 ${
          !isLandingPage || isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg"
            : "bg-sky-900/30 backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-[80rem] mx-auto px-6">
          <div className="navbar_items_wrapper">
            <Link
              to="/"
              className={`text-2xl md:text-3xl font-semibold ${
                !isLandingPage || isScrolled ? "text-blue-500" : "text-white"
              }`}
              onClick={handleLogoClick}
            >
              ShadowManga
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {isLogin && (
                <>
                  <Link
                    to="/register-hotel"
                    target="_blank"
                    className={`hover:bg-blue-50/20 rounded-md px-3 py-2 transition-colors ${
                      !isLandingPage || isScrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-white hover:text-white"
                    }`}
                  >
                    {t("List your property")}
                  </Link>
                  <Link
                    to="/bookings"
                    className={`hover:bg-blue-50/20 rounded-md px-3 py-2 transition-colors ${
                      !isLandingPage || isScrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-white hover:text-white"
                    }`}
                  >
                    {t("Bookings")}
                  </Link>
                  <Link
                    to="/profile"
                    className={`hover:bg-blue-50/20 rounded-md px-3 py-2 transition-colors ${
                      !isLandingPage || isScrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-white hover:text-white"
                    }`}
                  >
                    {t("Profile")}
                  </Link>
                </>
              )}

              {/* Desktop Language Dropdown */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`hover:bg-blue-50/20 rounded-md p-2 transition-colors ${
                    !isLandingPage || isScrolled
                      ? "text-gray-600 hover:text-blue-600"
                      : "text-white hover:text-white"
                  }`}
                >
                  {getCurrentLanguage()}
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 mt-2 py-0.5 w-24 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg ring-1 ring-black/5">
                    {languages.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code)}
                        className={`
                          block w-full text-center px-3 py-2 text-sm
                          ${
                            i18n.language === code
                              ? "bg-sky-50/90 text-sky-600 font-medium"
                              : "text-gray-600 hover:text-sky-600 hover:bg-sky-50/90"
                          } transition-colors
                        `}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={`hidden md:block w-px h-5 ${
                  !isLandingPage || isScrolled ? "bg-gray-300" : "bg-white/30"
                }`}
              ></div>
              {!isLogin ? (
                <>
                  <Link
                    target="_blank"
                    to="/register-hotel"
                    className={`transition duration-300 font-normal  ${
                      !isLandingPage || isScrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-white hover:text-white"
                    }`}
                  >
                    {t("List your property")}
                  </Link>

                  <div
                    className={`hidden md:block w-px h-5 ${
                      !isLandingPage || isScrolled
                        ? "bg-gray-300"
                        : "bg-white/30"
                    }`}
                  ></div>
                </>
              ) : null}

              {isLogin ? (
                <div className="flex items-center space-x-4">
                  <Button label={t("Logout")} onClick={onLogOut} />
                </div>
              ) : (
                <>
                  <Button label={t("Login")} onClick={onLogIn} />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              {/* Mobile Language Menu - Moved outside hamburger */}
              <div className="relative" ref={mobileLangMenuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileLangOpen(!isMobileLangOpen);
                  }}
                  className={`hover:bg-blue-50/20 rounded-md p-2 transition-colors ${
                    !isLandingPage || isScrolled
                      ? "text-gray-600 hover:text-blue-600"
                      : "text-white hover:text-white"
                  }`}
                >
                  {getCurrentLanguage()}
                </button>

                {isMobileLangOpen && (
                  <div className="absolute right-0 mt-2 py-0.5 w-24 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg ring-1 ring-black/5">
                    {languages.map(({ code, label }) => (
                      <button
                        key={code}
                        onClick={() => {
                          handleLanguageChange(code);
                          setIsMobileLangOpen(false);
                        }}
                        className={`
                          block w-full text-center px-3 py-2 text-sm
                          ${
                            i18n.language === code
                              ? "bg-sky-50/90 text-sky-600 font-medium"
                              : "text-gray-600 hover:text-sky-600 hover:bg-sky-50/90"
                          } transition-colors
                        `}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`mx-2 w-px h-5 ${
                  !isLandingPage || isScrolled ? "bg-gray-300" : "bg-white/30"
                }`}
              ></div>

              <button
                onClick={toggleMenu}
                aria-label="menu-button"
                className={`hover:bg-blue-50/20 rounded-md p-2 transition-colors focus:outline-none ${
                  !isLandingPage || isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white hover:text-white"
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 mobile-menu" ref={mobileMenuRef}>
              <div className="flex flex-col space-y-3 rounded-xl p-2 bg-white shadow-lg">
                {/* Navigation Links */}
                {isLogin && (
                  <div className="space-y-1">
                    <Link
                      target="_blank"
                      to="/register-hotel"
                      className="block text-base hover:bg-gray-50 rounded-md px-3 py-2 transition-colors text-gray-700"
                      onClick={toggleMenu}
                    >
                      {t("List your property")}
                    </Link>
                    <Link
                      to="/bookings"
                      className="block text-base hover:bg-gray-50 rounded-md px-3 py-2 transition-colors text-gray-700"
                      onClick={toggleMenu}
                    >
                      {t("Bookings")}
                    </Link>
                    <Link
                      to="/profile"
                      className="block text-base hover:bg-gray-50 rounded-md px-3 py-2 transition-colors text-gray-700"
                      onClick={toggleMenu}
                    >
                      {t("Profile")}
                    </Link>
                    <button
                      onClick={() => {
                        onLogOut();
                        toggleMenu();
                      }}
                      className="block w-full text-left text-base rounded-md px-3 py-2 transition-colors bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-700"
                    >
                      {t("Logout")}
                    </button>
                  </div>
                )}

                {!isLogin && (
                  <>
                    <Link
                      target="_blank"
                      to="/register-hotel"
                      className="block text-base hover:bg-gray-50 rounded-md px-3 py-2 transition-colors text-gray-700"
                      onClick={toggleMenu}
                    >
                      {t("List your property")}
                    </Link>
                  <Button
                    label={t("Login")}
                    onClick={() => {
                      onLogIn();
                      toggleMenu();
                    }}
                    styles={{ width: "100%" }}
                    />
                    </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
