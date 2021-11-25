import React, { useCallback } from "react";
import ProductCard from "../ProductCard";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Divider } from "@mui/material";

const replaceSpaceWithUnderscore = (str) => {
  return str.replace(" ", "_");
};

const Container = styled.div`
  width: 100%;
  margin-left: 3rem;
`;

const H1 = styled.h1`
  padding: 0;
  margin-inline: 0;
  margin-block: 0.5rem;
  scroll-margin-top: 4rem;
`;

const Padding = styled(Divider)`
  margin-block: 1.3rem;
`;

const ProductBox = ({ products }) => {
  const CategoryLayout = useCallback((category) => {
    return (
      <div>
        <H1 id={replaceSpaceWithUnderscore(category.name)}>{category.name}</H1>
        {category.items.length > 0 ? (
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
            {category.items.map((item) => {
              return (
                <Grid item xs={1} sm={2} md={4} key={category._id}>
                  <ProductCard
                    price={item.price}
                    title={item.name}
                    image={item.image}
                    href={`/item/${item._id}`}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <p>No Items Currently</p>
        )}
        <Padding />
      </div>
    );
  }, []);

  return <Container>{products.map((product) => CategoryLayout(product))}</Container>;
};

export default ProductBox;
