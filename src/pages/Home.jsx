import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";

import { SimpleSelect } from "../components/SimpleSelect";
import { SelectServices } from "../components/SelectServices";

import Graph from '../components/Graph';

import { Checkbox } from "@mui/material";

import { TimeSlider } from "../components/TimeSlider";


import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export const menuItems = [ {label:"1 Hour", value:"oneHour", step:23}, {label:"6 Hours", value:"sixHours", step:3}, 
{label:"12 Hours", value:"twelvehours", step:1}, {label:"24 Hours", value:"oneDay", step:0}]

export const filterMenuItems = [
   {primary: "HTTP Status", key: "http_status"},
   {primary: "Average Latency", key: "avglat"},
   {primary: "Maximum Latency", key: "maxlat"},
   {primary: "Minimum Latency", key: "minlat"},
]

export const serviceMenuItems = [ 
{primary: "Authorization", icon: <LockIcon/>, key: "auth"},
{primary: "User", icon: <PersonIcon/>, key: "user"},
{primary: "Carts", icon: <ShoppingCartIcon/>, key: "cart"},
{primary: "Products", icon: <Inventory2Icon/>, key: "products"},
{primary: "Suggestions", icon:<AssistantPhotoIcon/>, key: "suggestions"},
{primary: "Billing", icon: <CreditCardIcon/>, key: "billing"},
]

export const defValue = menuItems[3].value



export const Home = () => {
    const { authenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [newData, setNewData] = useState(null);
    const [pingData, setPingData] = useState(null);
    const [selectedTime, setSelectedTime] = useState(defValue);
    const [steps, setSteps] = useState(null);
    const [selectedCheckValue, setSelectedCheckValue] = useState();

    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            await axios.get('/metrics/querydb').then(res => {
                console.log(res)
                const pingData = res.data;
                setPingData(pingData)
                return pingData;
            });

            setAccount(data);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        for(const item of menuItems) {
            if(item.value === selectedTime) {
                setSteps(item.step)
            } 
        }
    }, [selectedTime])

    if (isLoading) {
        return <div>Loading...</div>;
    }
        
    return (<>Welcome to the app {account.account_name} and these are our services: {newData} 
                    <Graph services={selectedCheckValue}/>
                    <br></br>
                    <TimeSlider steps={steps} time={selectedTime}/>
                    <br></br>
                    <SimpleSelect onValueChange={(value) => setSelectedTime(value)} menuItems={menuItems} title="Time"/>
                <br></br>

                <SelectServices onServicesChange={setSelectedCheckValue} serviceMenuItems={serviceMenuItems} filterMenuItems={filterMenuItems}/>
                <br/><br/>
                <br></br>
                <br></br>
               
    </>);
}
