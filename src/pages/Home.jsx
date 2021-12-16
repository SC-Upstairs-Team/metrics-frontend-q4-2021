import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";
import { SimpleSelect } from "../components/SimpleSelect";
import { SelectServices } from "../components/SelectServices";
import Graph from '../components/Graph';
import { TimeSlider } from "../components/TimeSlider";
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Typography } from "@mui/material";
import { StylesProvider } from "@material-ui/styles";
import styles from '../components/Home.module.css'
import { stepButtonClasses } from "@mui/material";

export const menuItems = [ {label:"1 Hour", value: 1, step:23}, {label:"6 Hours", value: 6, step:3}, 
{label:"12 Hours", value: 12, step:1}, {label:"24 Hours", value: 24, step:0}]

export const filterMenuItems = [
   {primary: "HTTP Status", key: "http_status"},
   {primary: "Average Latency", key: "avglat"},
   {primary: "Minimum Latency", key: "minlat"},
   {primary: "99th Percentile", key: "percent"}
]

export const serviceMenuItems = [ 
{primary: "Authorization", icon: <LockIcon/>, key: "authorization"},
{primary: "Users", icon: <PersonIcon/>, key: "users"},
{primary: "Cart", icon: <ShoppingCartIcon/>, key: "cart"},
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
    const [selectedStep, setSelectedStep] = useState();
    const [selectedCheckValue, setSelectedCheckValue] = useState();

    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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
        
    return (<> <Typography variant="h6" component="h2">Welcome to the app {account.account_name}, view metrics data below: {newData} </Typography>

                    <div className = {styles.GraphInLine}>
                        <div className={styles.GraphAndSelection}>
                            <SelectServices onServicesChange={setSelectedCheckValue} serviceMenuItems={serviceMenuItems} filterMenuItems={filterMenuItems}/>
                            <Graph services={selectedCheckValue} time={selectedTime} steps={steps} steps={selectedStep}/>
                        </div>
                        <div className = {styles.TimeSlider}>
                        <TimeSlider steps={steps} time={selectedTime} onValueChange={(value) => setSelectedStep(value)}/>
                        <SimpleSelect onValueChange={(value) => setSelectedTime(value)} menuItems={menuItems} title="Time"/>
                        </div>

                        </div>
                 
    </>);
}
