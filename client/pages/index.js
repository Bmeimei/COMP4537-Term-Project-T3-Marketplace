import styled from "styled-components";
import Header from "../src/components/Header";
import SideNav from "../src/components/SideNav";
import Post from "../src/components/Post";
import ProductBox from "../src/components/ProductBox";
import Box from '@mui/material/Box';


const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
`;

const PageLayout = styled.div`


`;

const Posts = styled.div``;

export default function Home() {
  const posts = [{}, {}, {}];

  return (
      <Container>
        <Header />
        {/* <PageLayout> */}
          <Box sx={{ display: 'flex' }}>
            <SideNav />
            <ProductBox />
          </Box>
      </Container>
  );
}
