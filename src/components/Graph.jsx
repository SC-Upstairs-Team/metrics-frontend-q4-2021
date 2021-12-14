import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend
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

    const dataArray = [];
    const updatedDataArray = [];
    const [moreData, setMoreData] = useState(metricsData);
    const [otherData, setOtherData] = useState(metricsData);
    const [minLatency, setMinLatency] = useState();
    const [graphTitle, setGraphTitle] = useState();

    useEffect(() => {
        axios.get('/metrics/querydb').then(res => {
            const metricsData = res.data;
            setMetricsData(metricsData)
        });
    }, []);

    useEffect(() => {
        if (metricsData && metricsData.length > 0) {
            for (let i = 0; i < 40; i++) {
                dataArray[i] = {
                    name: new Date(metricsData[i].ts_point).toLocaleString("en-GB",
                        { hour: "numeric", minute: "numeric", second: "numeric" }),
                    Latency: metricsData[i].avg_lat,
                    MaxLatency: metricsData[i].avg_max,
                    MinLatency: metricsData[i].avg_min,
                    ServiceType: metricsData[i].service_type
                }
            }
            setMoreData(dataArray)
        }
    }, [metricsData])

    useEffect(() => {
        if (metricsData && metricsData.length > 0) {
            for (let i = 0; i < 10; i++) {

                updatedDataArray[i] = {
                    name: new Date(metricsData[i].ts_point).toLocaleString("en-GB",
                        { hour: "numeric", minute: "numeric", second: "numeric" }),
                    Latency: metricsData[i].avg_lat,
                    MaxLatency: metricsData[i].avg_max,
                    MinLatency: metricsData[i].avg_min,
                    ServiceType: metricsData[i].service_type
                }
            } setOtherData(updatedDataArray)
            console.log(otherData)
        }
    }, [metricsData])

    return (
        <div>
            <Button variant="contained"
                onClick={() => {
                    setMoreData(
                        otherData);
                    { setGraphTitle(metricsData[100].service_type + " - Latency Information") }
                }} > Change Data
            </Button>

            <Button variant="contained"
                onClick={() => {
                    setMinLatency(
                        "MinLatency");
                }} > Show Min Latency
            </Button>

            <Button id="bar" variant="contained"
                onClick={() => { setDisplayedChartType(ChartTypes.Bar) }} > Make a bar graph
            </Button>

            <Typography ml={6.5} variant="h4" component="h2">
                {graphTitle}
            </Typography>

            {[ChartTypes.Line, ChartTypes.Unknown].indexOf(displayedChartType) != -1 && (
                <LineChart
                    width={1200}
                    height={400}
                    data={moreData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" domain={[0, dataMax => (dataMax * 1.5)]} />
                    <Tooltip />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={'Latency'}
                        stroke='#8884d8'
                        fill='#8884d8'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        dataKey={minLatency}
                        stroke='#E1341E'
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
                    <Bar dataKey="Latency" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    )
}

export default Graph