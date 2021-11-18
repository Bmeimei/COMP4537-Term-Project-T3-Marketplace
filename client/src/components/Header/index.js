import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { AppBar, Toolbar, ListItem, ListItemText } from "@material-ui/core";
import Link from "next/link";
import MarketplaceLogo from "./logo";
import styled from "styled-components";

const StyleAppBar = styled(AppBar)`
  position: relative;
`;

const MenuButton = styled.div`
  margin-left: 2rem;
`;

const Li = styled.li`
  list-style: none;
`;

const Header = ({ headersData }) => {
  const displayMenuButtons = useCallback(
    () =>
      headersData.map(({ label, page }, index) => (
        <Li key={index}>
          <Link href={page} passHref>
            <ListItem button component="a">
              <ListItemText>{label}</ListItemText>
            </ListItem>
          </Link>
        </Li>
      )),
    [headersData]
  );

  // const getMenuButtons = () => {
  //   return headersData.map(({ label, page }) => {
  //     return (
  //       <Link href={page}>
  //         <Button
  //           {...{
  //             key: label,
  //             color: "inherit"
  //             // to: href,
  //             // component: Link,
  //           }}>
  //           {label}
  //         </Button>
  //       </Link>
  //     );
  //   });
  // };

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

  // const displayDesktop = () => {
  //   return (
  //     <Toolbar>
  //       <MarketplaceLogo />
  //       <div
  //         {...{
  //           className: menuButton
  //         }}>
  //         {getMenuButtons()}
  //       </div>
  //     </Toolbar>
  //   );
  // };

  return (
    <header>
      <StyleAppBar position="fixed">
        <Toolbar>
          <MarketplaceLogo />
          <MenuButton>{displayMenuButtons()}</MenuButton>
        </Toolbar>
      </StyleAppBar>
    </header>
  );
};

export default Header;

Header.propTypes = {
  headersData: PropTypes.array.isRequired
};
