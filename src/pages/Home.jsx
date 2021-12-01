import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";

export const Home = () => {
    const { authenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [newData, setNewData] = useState(null);

    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            await axios.get('/services').then(res => {
                const newData = JSON.stringify(res.data);
                setNewData(newData)
                return newData;
            });

            setAccount(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (<>Welcome to the app {account.account_name} and these are our services: {newData}</>);
}
