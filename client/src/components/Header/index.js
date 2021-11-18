import React from "react";
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import {Link} from 'next/link';
import head from "next/head";


const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative"
  },
  menuButton: {
    marginLeft: "20px"
  }
}))

const Header = () => {
  const {header, menuButton} = useStyles();
  const headersData = [
    {
      label: "Listings",
      href: "../Post/index.js",
    },
    {
      label: "My Account",
      href: "/account",
    },
    {
      label: "Log In",
      href: "localhost:3000/login",
    },
  ];
  
  const getMenuButtons = () => {
    return headersData.map(({label, href}) => {
      return (
   
          <Button
            {...{
              key: label,
              color: "inherit",
              to: href,
              component: Link,
            }}
          >
            {label}
          </Button>
     
      )
    })
  }
  const displayDesktop = () => {
    return (
      <Toolbar>
        {marketplaceLogo}
        <div
          {...{
            className: menuButton
          }}
        >
          {getMenuButtons()}          
        </div>

      </Toolbar>
    );
  };

  const marketplaceLogo = (
    <Typography variant="h6" component="h1">
      Marketplace
    </Typography>
  );
  
  return (
    <header>
      <AppBar position="fixed" className={header}>{displayDesktop()}</AppBar>
    </header>
  );
};

export default Header;
