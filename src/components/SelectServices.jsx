import React, {useEffect} from 'react';
import { ListSubheader, List } from '@mui/material/';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { Collapse, Checkbox, Radio } from '@mui/material/';
import { ExpandLess, ExpandMore } from '@mui/icons-material/';

const checkName = { inputProps: { 'aria-label': 'Checkbox' } };


export function SelectServices(props) {

    const { serviceMenuItems, filterMenuItems} = props;

    const checkedInitialState = {};

    for(const item in serviceMenuItems) {
        for(const subItem in filterMenuItems) {
            checkedInitialState[filterMenuItems[subItem].key + serviceMenuItems[item].key] = false;
        }
    }

  const [open, setOpen] = React.useState({});
  const [checked, setChecked] = React.useState(checkedInitialState);
  const [ticked, setTicked] = React.useState(serviceMenuItems[0].key);
  const [selectedParentKey, setSelectedParentKey] = React.useState("authorization");
  const [httpStatusChecked, setHttpStatusChecked] = React.useState(false);
  const [otherChildChecked, setOtherChildChecked] = React.useState(false);

  const selectRadio = (key) => {
      if (key !== selectedParentKey) {
        setChecked(checkedInitialState)
        setSelectedParentKey(key) 
        setOtherChildChecked(false)
        setHttpStatusChecked(false)
      }
      setTicked(key);
  }


  
  const handleClick = (key) => {
    if(key !== selectedParentKey) {
      setOpen(false);
      return
    } 
    setOpen({...open, [key]: open[key]? !open[key] : true});
  };
  

  const selectCheckbox = (parent, child) => {
    const key = child+parent
    setChecked({...checked, [key]: !checked[key]});
  };

  
  const isDisabled = (parent, child) => {
    if(selectedParentKey !== undefined) {
    }
    if(selectedParentKey !== parent) {
      return true;
    } 

    if(child === "http_status") {
      if(otherChildChecked) {
        return true;
      } return false;
    } else {
      if(httpStatusChecked) {
        return true;
      } return false;
    }
  }

  useEffect(() => { 
    const keys = Object.keys(checked);
    const filtered = keys.filter(function(key) {
      return checked[key]; 
    });
    const args = [];
    for(const filter of filtered) {
      args.push(filter.replace(ticked,""));
    }
    if(args.includes("http_status")) {
      setHttpStatusChecked(true)
    }
    if(!args.includes("http_status")) {
      setHttpStatusChecked(false)
      let disabledOther = false
      for(const checkedItem of Object.entries(checked)){
        
        if(checkedItem[1]) {
            disabledOther = true
        }
      }
      if(!disabledOther) {
          setOtherChildChecked(false)
      } else {
         setOtherChildChecked(true)      
      }
    }    
    props.onServicesChange([args, ticked])
  }, [checked, ticked])


  

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="Services"
      disabled={false}
      subheader={
        <ListSubheader component="div" id="services">
          Services
        </ListSubheader>
      }
    >
    {serviceMenuItems.map(item => (
        <div key={item.key}>
            <ListItemButton onClick={() => handleClick(item.key)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.primary}</ListItemText>
                <Radio checked={item.key === ticked} onChange={() => {selectRadio(item.key)}}>
                    </Radio>
                {open[item.key] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {filterMenuItems.map(child => {
                return (
                    <Collapse key={child.key + item.key} in={open[item.key]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary={child.primary} />
                                <Checkbox checked={checked[child.key + item.key]} onChange={() => {selectCheckbox(item.key, child.key)}} 
                                {...checkName} disabled={isDisabled(item.key, child.key)}/>
                            </ListItemButton>
                        </List>
                    </Collapse>
                )})}
        </div>
    ))}
    </List>
  );
}