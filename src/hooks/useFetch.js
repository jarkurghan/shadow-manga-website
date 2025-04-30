import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios({
                headers: {
                    Authorization: sessionStorage.getItem("token") || Cookies.get("token")
                },
                method: options.method || "GET",
                url: url,
                data: options.body || null,
            });
            setData(response.data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useFetch;
