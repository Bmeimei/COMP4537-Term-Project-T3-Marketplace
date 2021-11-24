import React from "react";
import styled from "styled-components";
import { Container } from "../src/components/admin";
import Header from "../src/components/Header";

const Wrapper = styled.div`
  min-height: 100vh;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const headersData = [
  {
    label: "Listings",
    page: "/"
  },
  {
    label: "My Account",
    page: "/me"
  },
  {
    label: "Log In",
    page: "/login"
  }
];

const NotFound = () => {
  return (
    <Container>
      <Header headersData={headersData} />
      <Wrapper>Sorry. The Page you are requesting does not exist.</Wrapper>
    </Container>
  );
};

export default NotFound;
