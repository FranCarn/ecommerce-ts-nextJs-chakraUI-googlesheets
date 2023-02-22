import api from "@/product/api";
import { Product } from "@/product/types";
import { GetStaticProps } from "next";
import React from "react";

interface Props {
  products: Product[];
}

const IndexRoute: React.FC<Props> = () => {
  return <div>{`<IndexRoute/>`}</div>;
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
