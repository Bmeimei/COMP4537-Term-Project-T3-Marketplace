import React from "react";
import Header from "../Header";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
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

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container>
      <Header headersData={headersData} />
      <LoadingContainer>
        <CircularProgress color="inherit" />
      </LoadingContainer>
    </Container>
  );
};

export default Loading;
