import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { defValue } from '../pages/Home';

export function SimpleSelect(props) {

  const [value, setValue] = React.useState(defValue);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setValue(value);
    props.onValueChange(value)
  }

  return (
    <Box sx={{ width: 135, paddingLeft: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="time-id">{props.title}</InputLabel>
        <Select
          value={value}
          label="Time Frame"
          onChange={(e)=> handleOnChange(e)}
        >
          {props.menuItems.map(item => {
            return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
          })}

        </Select>
      </FormControl>
    </Box>
  );
}