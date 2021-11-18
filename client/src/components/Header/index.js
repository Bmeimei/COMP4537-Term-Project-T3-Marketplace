import React from "react";
import {AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";
import Link from 'next/link';
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
      page: "",
    },
    {
      label: "My Account",
      page: "/account",
    },
    {
      label: "Log In",
      page: "/login",
    },
  ];
  
  const getMenuButtons = () => {
    return headersData.map(({label, page}) => {
      return (
        <Link href={page}>
          <Button
            {...{
              key: label,
              color: "inherit",
              // to: href,
              // component: Link,
            }}
          >
            {label}
          </Button>
        </Link>

      )
    })
  }

  // const getMenuButtons = () => {
  //   return (
  //     <ul>
  //       {headersData.map(({label, href}) => {
  //         console.log(href)
  //         return (
  //           <li>
  //             <Link href="/login">
  //               <Button
  //                 {...{
  //                   key: label,
  //                   color: "inherit",
  //                   to: href,
  //                   component: Link,
  //                 }}
  //               >
  //                 {label}
  //               </Button>
  //             </Link>
  //           </li>
  //         )
  //       })}
  //     </ul> 
  //   )
  // }

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
