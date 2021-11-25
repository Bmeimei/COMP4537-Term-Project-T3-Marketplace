import React from "react";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PetsIcon from "@mui/icons-material/Pets";
import GestureIcon from "@mui/icons-material/Gesture";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    marginTop: "10px"
  },
  anchor: {
    textDecoration: "none",
    color: "black"
  }
}));

const replaceSpaceWithUnderscore = (str) => {
  return str.replace(" ", "_");
};

const getIconByCategoryName = (category) => {
  switch (category) {
    case "Electronics":
      return <SmartphoneIcon />;
    case "Vehicle":
      return <DirectionsCarIcon />;
    case "Pet Supplies":
      return <PetsIcon />;
    case "Hobbies":
      return <GestureIcon />;
    default:
      return <ShoppingBasketIcon />;
  }
};

const SideNav = ({ products }) => {
  const { drawer, anchor } = useStyles();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          zIndex: 0
        }
      }}
      variant="permanent"
      anchor="left">
      <Toolbar className={drawer} />
      <Typography variant="h6" component="h1" style={{ paddingLeft: "1rem" }}>
        Categories
      </Typography>
      <Divider />
      <List>
        {products.map((product) => (
          <Link href={`#${replaceSpaceWithUnderscore(product.name)}`} key={product._id}>
            <a className={anchor}>
              <ListItem button>
                <ListItemIcon>{getIconByCategoryName(product.name)}</ListItemIcon>
                <ListItemText primary={product.name} />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNav;
