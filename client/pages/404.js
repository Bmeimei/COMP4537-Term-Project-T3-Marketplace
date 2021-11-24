import React from "react";
import styled from "styled-components";
import Header from "../src/components/Header";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFound = () => {
  return (
    <Container>
      <Header />
      <Wrapper>Sorry. The Page you are requesting does not exist.</Wrapper>
    </Container>
  );
};

export default NotFound;
