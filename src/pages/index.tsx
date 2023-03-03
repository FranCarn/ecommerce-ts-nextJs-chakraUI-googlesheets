import api from "@/product/api";
import { Product } from "@/product/types";
import { Grid, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";

interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  return (
    <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
      {products.map((product) => (
        <Stack backgroundColor="gray.100" key={product.id}>
          <Text>{product.title}</Text>
        </Stack>
      ))}
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    props: {
      products,
    },
  };
};

export default IndexRoute;
