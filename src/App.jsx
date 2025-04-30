import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./store/auth.js";
// import NotFound from "./components/NotFound.jsx";
import Cookies from "js-cookie";
import Cool from "./Cool.jsx";
import axios from "axios";

function App() {
    const dispatch = useDispatch();
    const location = useLocation(); // Get the current route
    const til = localStorage.getItem("i18nextLng");

    // Ensure language is one of the supported values
    if (til !== "en" && til !== "uz" && til !== "ru") localStorage.setItem("i18nextLng", "en");

    const token = Cookies.get("token");

    // Check if the current route is /maps
    const isMapsRoute = location.pathname === "/maps";

    useEffect(() => {
        if (token) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/auth`, {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    dispatch(setAuth(res.data.data));
                });
        }
    }, [location.search, token, dispatch]);

    return (
        <div className="flex flex-col bg-slate-100 min-h-screen">
            {/* <header className={isMapsRoute ? "hidden md:block" : "block"}>
                <Navbar />
            </header> */}

            {/* Main Content */}
            <main className="bg-white flex-grow">
                <Routes>
                    {/* <Route path="*" element={<NotFound />} /> */}
                    <Route path="/" element={<Cool />} />
                </Routes>
            </main>

            {/* <footer className={isMapsRoute ? "hidden md:block" : "block"}>
                <Footer />
            </footer> */}
        </div>
    );
}

export default App;
