import FloatingButton from './FloatingButton';
import GameField from "./GameField";
import "./GlobalWindow.scss";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "./contexts/AppContext";
import configData from "../config.json";

const GlobalWindow = () => {
    const {tg, setTG} = useContext(MyContext);
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [authFailed, setAuthFailed] = useState(false);

    const apiService = axios.create({
        baseURL: configData.API_ENDPOINT_URL,
        headers: {
            'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'ngrok-skip-browser-warning': 69420
        }
    });

    const authorize = async (tgData: any) => {
        try {
            const response = await apiService.post('/authorize', tgData);
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            sessionStorage.setItem('id', response.data);
            return response.data;
        } catch (error) {
            console.error('Error submitting plant data:', error);
            setAuthFailed(true);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const storedId = sessionStorage.getItem('id');
            if (!storedId) {
                try {
                    const id = await authorize(tg);
                    setData(id);
                    setLoading(false);
                } catch (error) {
                    console.error('Error submitting plant data:', error);
                }
            } else {
                setData(storedId);
                setLoading(false);
            }
        };

        fetchData();
    }, [tg]);

    if (loading) {
        return <div className="loading-cat">Loading...</div>;
    }

    if (authFailed) {
        return <div className="auth-failed">Authorization Failed. Please try again.</div>;
    }

    return (
        <div className='background-image'>
            <div className='field-wrapper'>
                {data !== "" && (
                    <div className='global-window'>
                        <GameField/>
                    </div>
                )}
            </div>
            {data !== "" && <FloatingButton/>}
        </div>
    );
};

export default GlobalWindow;
