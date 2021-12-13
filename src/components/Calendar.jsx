// import React from 'react';
// //import subWeeks from 'date-fns/subWeeks';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import { format } from 'date-fns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import Stack from '@mui/material/Stack';
// import DatePicker from '@mui/lab/DatePicker';
// //import Box from '@mui/material/Box';

// export function ViewDate() {

//   const [date, setDate] = React.useState(new Date());

//   console.log(date)
  
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Stack sx={{ width: 150 }} spacing={3}>
//         <DatePicker
//         value={format(date, "dd-MM-yyyy")}
//         readOnly
//         onChange={(newDate) => {
//           setDate(newDate);
//         }}
//         renderInput={(params) => <TextField {...params} helperText={null}/>}/>
//       </Stack>
//    </LocalizationProvider>  
//   )
// }
  
// A TO & FROM SELECTOR START

// export function Calendar() {
//   const [selectedDate, handleDateChange] = useState([null, null]);
//   const currentDate = new Date();
//   const maxRollback = subWeeks(currentDate, 4);
//   const [pickerOpen, setPickerOpen] = useState(false);

//   useEffect(() => {
//     if(selectedDate[0] && selectedDate[1]) {
//       setPickerOpen(false);
//     }
//   }, [selectedDate])

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DateRangePicker
//         value={selectedDate}
//         maxDate={currentDate}
//         minDate={maxRollback}
//         startText="From"
//         endText="To"
//         disableHighlightToday
//         defaultCalendarMonth={maxRollback}
//         onChange={(newValue) => {
//           handleDateChange(newValue);
          
//         }}
//         renderInput={(startProps, endProps) => (
//           <React.Fragment>
//             <TextField {...startProps} />
//             <Box sx={{ mx: 2 }}> to </Box>
//             <TextField {...endProps} />
//           </React.Fragment>
//           )}
//       />
//     </LocalizationProvider>
//   );
// }

// A TO & FROM SELECTOR FINISH