import React, {useEffect} from "react";
import { Slider } from "@mui/material";
import axios from "axios";
import Box from '@mui/material/Box';


export function TimeSlider(props) {
    const [maxValue, setMaxValue] = React.useState(props.steps);
    const [value, setValue] = React.useState(props.steps);
    const [time, setTime] = React.useState(props.time);

    const handleOnChange = () => {
   
    }
    
    useEffect(() => {
      setMaxValue(props.steps)
      setValue(props.steps)
    }, [props.steps])

    useEffect(() => {
      props.onValueChange(value)
    }, [value])

    return(
      <Box sx={{ width: 1000}}>
      <Slider
        step={1}
        marks
        min={0}
        max={maxValue}
        value={value}
        defaultValue={23}
        disabled={maxValue === 0}
        onChange={(e)=> setValue(e.target.value)}
        onChangeCommitted={handleOnChange}
      />
    </Box>
    )
}