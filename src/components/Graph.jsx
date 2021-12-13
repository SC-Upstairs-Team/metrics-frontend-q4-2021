import React, { useState } from 'react';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';



import {Typography, Button} from "@mui/material";

function Graph(props){


    const data = [{"pod_id":"users-ed01a939","service_type":"users","ts":10000,"http_status":{"200":56,"401":2,"403":7,"404":5,"499":1},
    "avg_latency":250,"percentile_99":200,"min_latency":100,"max_latency":300},{"pod_id":"users-ed01a459","service_type":"users","ts":20000,
    "http_status":{"200":56,"401":6,"403":6,"404":6,"499":3},"avg_latency":200,"percentile_99":150,"min_latency":50,"max_latency":250}
    ,{"pod_id":"users-ed01a889","service_type":"users","ts":30000,
    "http_status":{"200":45,"401":6,"403":6,"404":6,"499":3},"avg_latency":175,"percentile_99":165,"min_latency":20,"max_latency":350}

    ,{"pod_id":"users-ed01a979","service_type":"users","ts":40000,
    "http_status":{"200":23,"401":2,"403":5,"404":7,"499":8},"avg_latency":120,"percentile_99":175,"min_latency":35,"max_latency":420}

    ,{"pod_id":"users-ed01a699","service_type":"users","ts":50000,
    "http_status":{"200":49,"401":6,"403":6,"404":6,"499":3},"avg_latency":180,"percentile_99":160,"min_latency":28,"max_latency":390}


    ,{"pod_id":"users-ed01a239","service_type":"users","ts":60000,
    "http_status":{"200":45,"401":6,"403":6,"404":6,"499":3},"avg_latency":100,"percentile_99":200,"min_latency":33,"max_latency":444}

    ,{"pod_id":"users-ed01a239","service_type":"users","ts":70000,
    "http_status":{"200":45,"401":6,"403":6,"404":6,"499":3},"avg_latency":120,"percentile_99":200,"min_latency":33,"max_latency":444}

    ,{"pod_id":"users-ed01a239","service_type":"users","ts":80000,
    "http_status":{"200":45,"401":6,"403":6,"404":6,"499":3},"avg_latency":165,"percentile_99":200,"min_latency":33,"max_latency":444}

    ,{"pod_id":"users-ed01a239","service_type":"users","ts":90000,
    "http_status":{"200":45,"401":6,"403":6,"404":6,"499":3},"avg_latency":179,"percentile_99":200,"min_latency":33,"max_latency":444}

    ,{"pod_id":"users-ed01a239","service_type":"users","ts":100000,
    "http_status":{"200":45,"401":6,"403":6,"404":6,"499":3},"avg_latency":200,"percentile_99":200,"min_latency":33,"max_latency":444}]
    


    const [backendData, setBackendData] = useState(data);

    const [minLatency, setMinLatency] = useState();

    //Change times from UNIX to readable english
    const timeStamps = data.map(time => new Date(time.ts * 1000).toLocaleString("en-US", {hour: "numeric"}))

    

    // const timeStamps = someStuff.map(time => {
    //     const {ts, service_type} = time;
    // })

  const dataArray = []
  const updatedDataArray = []



  //set initial dataset values
  var i = 0;
  for (i ; i < 4; i++) {
      dataArray[i] = {
          name: timeStamps[i], Latency: backendData[i].avg_latency, MaxLatency: backendData[i].max_latency, MinLatency: backendData[i].min_latency}
      }


// update the dataset values to use a different time frame
for (i = 4; i >= 4 && i < 10; i++ ) {
    updatedDataArray[(i-4)] = {
        name: timeStamps[i], Latency: backendData[i].avg_latency}
    }  



  const header = backendData[0].service_type.toUpperCase()
  const title = header + ' - Latency Information';

  const [metrics, setMetrics] = useState(dataArray);
  const [graphTitle, setGraphTitle] = useState(title);

  console.log(props.services)


return (

    
    <div>
        <Button variant="contained"
            onClick={() => {setMetrics(
            updatedDataArray); 
            {setGraphTitle("This is different data")}}} > Change Data
        </Button>
        
        <Button variant="contained"
            onClick={() => {setMinLatency(
            "MinLatency"); }} > Show Min Latency
        </Button>


        <Typography ml={6.5} variant="h4" component="h2">
            {graphTitle}
        </Typography>
        <LineChart
            width={1200}
            height={400}
            data={metrics}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[100, 300]}/>
            <Tooltip />
            <Line
                type='monotone'
                dataKey={'Latency'}
                stroke='#8884d8'
                fill='#8884d8'
            />
            <Line
                type='monotone'
                dataKey={minLatency}
                stroke='#E1341E'
                fill='#8884d8' 
            />



            {/* <Line
                type='monotone'
                dataKey={'amt'}
                stroke='#E1341E'
                fill='#6764d8' 
            /> */}
        </LineChart>
   </div>


)

}


export default Graph

