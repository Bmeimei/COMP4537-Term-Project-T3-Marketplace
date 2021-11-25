import styled from "styled-components";
import Header from "../src/components/Header";
import SideNav from "../src/components/SideNav";
import ProductBox from "../src/components/ProductBox";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Loading from "../src/components/Loading";
import { getItemsGroupedByCategories } from "../src/api/category";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
`;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoaded(true);
      try {
        const productsData = (await getItemsGroupedByCategories()).data.categories;
        setProducts(productsData);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoaded(false);
      }
    })();
  }, []);

  if (isLoaded) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />
      <Box sx={{ display: "flex" }}>
        <SideNav products={products} />
        <ProductBox products={products} />
      </Box>
    </Container>
  );
}
