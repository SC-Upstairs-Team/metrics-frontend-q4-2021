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
  const [selectedParentKey, setSelectedParentKey] = React.useState(undefined);

  const selectRadio = (key) => {
      if (key !== selectedParentKey) {
        setChecked(checkedInitialState)
        setSelectedParentKey(key) 
      }
      setTicked(key);
  }



  const handleClick = (key) => {
    setOpen({...open, [key]: open[key]? !open[key] : true});
  };


  const selectCheckbox = (key, parentKey) => {
    setChecked({...checked, [key]: !checked[key]});
    // let disabledOther = false;
    // for(const checkedItem of Object.entries(checked)){
    //     if(checkedItem[1]) {
    //         disabledOther = true;
    //     }
    // }
    // if(!disabledOther) {
    //     setSelectedParentKey(parentKey)
    // } else {
    //     setSelectedParentKey(undefined)
    // }
  };


  useEffect(() => { 
    const keys = Object.keys(checked);
    const filtered = keys.filter(function(key) {
      return checked[key]; 
    });
    const args = [];
    for(const filter of filtered) {
      args.push(filter.replace(ticked,""));
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
                                <Checkbox checked={checked[child.key + item.key]} onChange={() => {selectCheckbox(child.key + item.key, item.key)}} 
                                {...checkName} disabled={selectedParentKey !== undefined && selectedParentKey !== item.key}/>
                            </ListItemButton>
                        </List>
                    </Collapse>
                )})}
        </div>
    ))}
    </List>
  );

}