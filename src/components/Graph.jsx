import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Title, BarChart, Bar, Legend
} from 'recharts';

import { Typography, Button } from "@mui/material";


const ChartTypes = Object.freeze({
    Unknown: "unknown",
    Bar: "bar",
    Line: "line",
}); 


function Graph(props) {

    const [metricsData, setMetricsData] = useState(null);
    const [displayedChartType, setDisplayedChartType] = useState(ChartTypes.Unknown);
  
    useEffect(() => {
        axios.get('/metrics/querydb').then(res => {
            const metricsData = res.data;
            setMetricsData(metricsData)
        });
    }, []);

    const dataArray = [];
    const updatedDataArray = [];
    const [moreData, setMoreData] = useState(metricsData);
    const [otherData, setOtherData] = useState(metricsData);
    const [selectedInformation, setSelectedInformation] = useState(props.services);
    const [minLatency, setMinLatency] = useState();
    const [percentile99th, setPercentile99th] = useState();
    const [dataKey, setDataKey] = useState("name");
    const [latency, setLatency] = useState();
    const [httpStatus200, setHttpStatus200] = useState();
    const [httpStatus400, setHttpStatus400] = useState();
    const [httpStatus401, setHttpStatus401] = useState();
    const [httpStatus403, setHttpStatus403] = useState();
    const [httpStatus404, setHttpStatus404] = useState();
    const [httpStatus499, setHttpStatus499] = useState();
    const [httpStatus500, setHttpStatus500] = useState();
    const [httpStatus502, setHttpStatus502] = useState();
    const [graphTitle, setGraphTitle] = useState();

    // all use effects needed for the data as it is undefined on load
    useEffect(() => {
        if (metricsData && metricsData.length > 0) {
            for (let i = 0; i < 60; i++) {
                dataArray[i] = {
                    name: new Date(metricsData[i].ts_point).toLocaleString("en-GB",
                        { hour: "numeric", minute: "numeric"}),
                    Latency: metricsData[i].avg_lat,
                    Percentile99th: metricsData[i].avg_per99,
                    MinLatency: metricsData[i].min_lat,
                    HttpStatus200: undefined,
                    HttpStatus400: metricsData.filter(e => metricsData[i].status_400 !== '0').length > 0 ? metricsData[i].status_400 : undefined,
                    HttpStatus401: metricsData.filter(e => metricsData[i].status_401 !== '0').length > 0 ? metricsData[i].status_401  : undefined,
                    HttpStatus403: metricsData.filter(e => metricsData[i].status_403 !== '0').length > 0 ? metricsData[i].status_403 : undefined,
                    HttpStatus404: metricsData.filter(e => metricsData[i].status_404 !== '0').length > 0 ? metricsData[i].status_404 : undefined,
                    HttpStatus499: metricsData.filter(e => metricsData[i].status_499 !== '0').length > 0 ? metricsData[i].status_499 : undefined,
                    HttpStatus500: metricsData.filter(e => metricsData[i].status_500 !== '0').length > 0 ? metricsData[i].status_500 : undefined,
                    HttpStatus502: metricsData.filter(e => metricsData[i].status_502 !== '0').length > 0 ? metricsData[i].status_502 : undefined,
                    ServiceType: metricsData[i].service_type
                }

            }
            setMoreData(dataArray)

        }
    }, [metricsData])



    // useEffect(() => {
    //     if (metricsData && metricsData.length > 0){
    //         for (let i = 0; i < 10; i ++){

    //             updatedDataArray[i] = {
    //                 name: new Date(metricsData[i].ts ).toLocaleString("en-GB", 
    //                 {hour: "numeric", minute: "numeric", second: "numeric"}), 
    //                 Latency: metricsData[i].avg_lat,
    //                  MaxLatency: metricsData[i].avg_max, 
    //                  MinLatency: metricsData[i].avg_min,
    //                 ServiceType: metricsData[i].service_type}
    //         } setOtherData(updatedDataArray)




    //     }
    // },[metricsData])



    useEffect(() => {
        if (props.services && props.services.length > 0) {
            console.log(props.services[1])


            setSelectedInformation(props.services)


            if (props.services[0].includes("avglat")) {
                console.log("AVERAGE LATENCY!")
                setLatency("Latency")
            }
            if (props.services[0].includes("percent")) {
                console.log("MAXIMUM LATENCY!")
                setPercentile99th("Percentile99th")
            }
            if (props.services[0].includes("minlat")) {
                console.log("MIN LATENCY")
                setMinLatency("MinLatency")
            }
            if (props.services[0].indexOf("minlat") === -1) {
                setMinLatency("off")
            }
            if (props.services[0].indexOf("percent") === -1) {
                setPercentile99th("off")
            }
            if (props.services[0].indexOf("avglat") === -1) {
                setLatency("off")
            }

            if (props.services[0].includes("http_status")) {
                console.log("status")


                setHttpStatus400("HttpStatus400")
                setHttpStatus401("HttpStatus401")
                setHttpStatus403("HttpStatus403")
                setHttpStatus404("HttpStatus404")
                setHttpStatus499("HttpStatus499")
                setHttpStatus500("HttpStatus500")
                setHttpStatus502("HttpStatus502")
                if (moreData[1].HttpStatus200 = 0) {
                    setHttpStatus400("off")
                }
            }
            if (props.services[0].indexOf("http_status")) {
                setHttpStatus200("off")
                setHttpStatus400("off")
                setHttpStatus401("off")
                setHttpStatus403("off")
                setHttpStatus404("off")
                setHttpStatus499("off")
                setHttpStatus500("off")
                setHttpStatus502("off")
            }

            if (props.services[1].includes("auth")) {
                
                if (props.services[0].includes("http_status")) {
                    setGraphTitle("Authorization - HTTP Status Codes")
                }

                else if (props.services[0].indexOf("avglat") && props.services[0].indexOf("percent") && props.services[0].indexOf("minlat")){
                    setGraphTitle("Authorization")
                }

                else {setGraphTitle("Authorization - Latency")}
                
            }


            if (props.services[1].includes("user")) {
                
                if (props.services[0].includes("http_status")) {
                    setGraphTitle("User - HTTP Status Codes")
                }

                else if (props.services[0].indexOf("avglat") && props.services[0].indexOf("percent") && props.services[0].indexOf("minlat")){
                    setGraphTitle("User")
                }

                else {setGraphTitle("User - Latency")}
                
            }


            if (props.services[1].includes("cart")) {
                
                if (props.services[0].includes("http_status")) {
                    setGraphTitle("Cart - HTTP Status Codes")
                }

                else if (props.services[0].indexOf("avglat") && props.services[0].indexOf("percent") && props.services[0].indexOf("minlat")){
                    setGraphTitle("Cart")
                }

                else {setGraphTitle("Cart - Latency ")}
                
            }

            if (props.services[1].includes("products")) {
                
                if (props.services[0].includes("http_status")) {
                    setGraphTitle("Products - HTTP Status Codes")
                }

                else if (props.services[0].indexOf("avglat") && props.services[0].indexOf("percent") && props.services[0].indexOf("minlat")){
                    setGraphTitle("Products")
                }

                else {setGraphTitle("Products - Latency")}
                
            }

            if (props.services[1].includes("suggestions")) {
                
                if (props.services[0].includes("http_status")) {
                    setGraphTitle("Suggestions - HTTP Status Codes")
                }

                else if (props.services[0].indexOf("avglat") && props.services[0].indexOf("percent") && props.services[0].indexOf("minlat")){
                    setGraphTitle("Suggestions")
                }

                else {setGraphTitle("Suggestions - Latency")}
                
            }

            if (props.services[1].includes("billing")) {
                
                if (props.services[0].includes("http_status")) {
                    setGraphTitle("Billing - HTTP Status Codes")
                }

                else if (props.services[0].indexOf("avglat") && props.services[0].indexOf("percent") && props.services[0].indexOf("minlat")){
                    setGraphTitle("Billing")
                }

                else {setGraphTitle("Billing - Latency")}
                
            }

        }


    }, [props.services])


    return (

        <div>

            <Typography ml={13.5} variant="h4" component="h2">
                {graphTitle}
            </Typography>

            {[ChartTypes.Line, ChartTypes.Unknown].indexOf(displayedChartType) != -1 && (
              
                <LineChart
                    width={1200}
                    height={400}
                    data={moreData}
                    margin={{ top: 10, right: 30, left: 50, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                      
                    <XAxis dataKey={dataKey} />
                    <YAxis type="number"domain={[0, dataMax => (dataMax * 1.5)]} />
                      
                    <Tooltip />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={latency}
                        stroke='#8884d8'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={minLatency}
                        stroke='#1ce32f'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={percentile99th}
                        stroke='#E1341E'
                        fill='#8884d8'
                    />

                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus400}
                        stroke='#E1341E'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus401}
                        stroke='#8884d8'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus403}
                        stroke='#FF8C00'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus404}
                        stroke='#00f5ff'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus499}
                        stroke='#010101'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus500}
                        stroke='#C600FF'
                        fill='#C600FF'
                    />

                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={httpStatus502}
                        stroke='#B65549'
                        fill='#8884d8'
                    />

                </LineChart>           
           )}
            {displayedChartType === ChartTypes.Bar && (

                <BarChart width={730} height={250} data={moreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="HttpStatus" fill="#8884d8" />
                </BarChart>

            )}

            {/* {displayedChartType === ChartTypes.Unknown && (
            <div>
                <button onClick={() => setDisplayedChartType(ChartTypes.Bar)}>Bar</button>
                <button onClick={() => setDisplayedChartType(ChartTypes.Line)}>Line</button>
            </div>
        )} */}



        </div>


    )

}



export default Graph