import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Link from "next/link";
import MarketplaceLogo from "./logo";
import styled from "styled-components";

const StyleAppBar = styled(AppBar)`
  position: relative;
`;

const StyleToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  height: 1.2rem;
`;

const Li = styled.li`
  list-style: none;
  display: block;
  font-size: 1.1rem;
`;

const ButtonLink = styled(Button)`
  color: inherit;
  text-decoration: none;
  padding-bottom: 0.2rem;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
`;

const Header = ({ headersData }) => {
  const displayMenuButtons = useCallback(
    () =>
      headersData.map(({ label, page }, index) => (
        <Li key={index}>
          <Link href={page} passHref>
            <ButtonLink as="a">{label}</ButtonLink>
          </Link>
        </Li>
      )),
    [headersData]
  );
  return (
    <header>
      <StyleAppBar position="fixed">
        <StyleToolBar>
          <MarketplaceLogo />
          <Ul>{displayMenuButtons()}</Ul>
        </StyleToolBar>
      </StyleAppBar>
    </header>
  );
};

export default Header;

Header.propTypes = {
  headersData: PropTypes.array.isRequired
};
