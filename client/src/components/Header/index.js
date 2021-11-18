import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { AppBar, Toolbar, ListItem, ListItemText } from "@material-ui/core";
import Link from "next/link";
import MarketplaceLogo from "./logo";
import styled from "styled-components";

const StyleAppBar = styled(AppBar)`
  position: relative;
`;

const MenuButton = styled.ul`
  margin-left: 2rem;
`;

const Li = styled.li`
  list-style: none;
  display: block;
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
