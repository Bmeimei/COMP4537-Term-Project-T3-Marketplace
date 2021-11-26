import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Link from "next/link";
import MarketplaceLogo from "./logo";
import styled from "styled-components";
import { getCurrentUser } from "../../api/user";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

const StyleAppBar = styled(AppBar)`
  width: 100%;
  height: 4rem;
  display: flex;
  align-content: center;
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
  cursor: pointer;
`;

const Header = () => {
  const [headersData, setHeadersData] = useState([]);
  const [user, setUser] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies(["userToken"]);

  useEffect(() => {
    if (cookies?.userToken) {
      (async () => {
        try {
          const currentUser = (await getCurrentUser()).data.user;
          setUser(currentUser);
        } catch (e) {
          console.log("User Not login");
          removeCookie("userToken");
        }
      })();
    }
  }, [cookies?.userToken, removeCookie]);

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

  useEffect(() => {
    if (!user) {
      setHeadersData([
        {
          label: "Log In",
          page: "/login"
        },
        {
          label: "Sign Up",
          page: "/signup"
        },
        {
          label: "Documentation",
          page: "/documentation"
        }
      ]);
    } else {
      setHeadersData([
        {
          label: "My Account",
          page: "/me"
        },
        {
          label: "Post Item",
          page: "/addItem"
        },
        {
          label: "Documentation",
          page: "/documentation"
        }
      ]);
    }
  }, [user]);

  return (
    <StyleAppBar position="sticky">
      <StyleToolBar>
        <Link href="/" passHref>
          <ButtonLink>
            <MarketplaceLogo />
          </ButtonLink>
        </Link>
        <Ul>
          {user && <Li>Hello, {user.username}</Li>}
          {displayMenuButtons()}
          {user && (
            <Li>
              <ButtonLink
                as="a"
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem("user");
                  removeCookie("userToken");
                  toast.success("☺️See You Next Time~");
                }}>
                Log out
              </ButtonLink>
            </Li>
          )}
        </Ul>
      </StyleToolBar>
    </StyleAppBar>
  );
};

export default Header;
