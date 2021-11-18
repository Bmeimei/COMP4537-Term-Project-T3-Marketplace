import React from "react";

import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PetsIcon from '@mui/icons-material/Pets';
import GestureIcon from '@mui/icons-material/Gesture';
import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    marginTop: "10px"
  }
}))

const SideNav = () => {
  const {drawer} = useStyles();

  const sideNavData = [
    {
      label: "Electronics",
      href: "../Post/index.js",
      icon: <SmartphoneIcon/>
    },
    {
      label: "Vehicles",
      href: "/account",
      icon: <DirectionsCarIcon/>
    },
    {
      label: "Pet Supplies",
      href: "/logout",
      icon: <PetsIcon />
    },
    {
      label: "Hobbies",
      href: "/logout",
      icon: <GestureIcon />
    },
  ];

  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        zIndex: 0
      },
    }}
    variant="permanent"
    anchor="left"
  >
    <Toolbar className={drawer}/>
    <Typography variant="h6" component="h1">
      Categories
    </Typography>
    <Divider />
    <List>
      {sideNavData.map(({label, href, icon}) => (
        <ListItem button key={label}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  </Drawer>
  );
};

export default SideNav;
