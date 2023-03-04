import api from "@/product/api";
import { Product } from "@/product/types";
import { Button, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React, { useMemo, useState } from "react";

interface Props {
  products: Product[];
  textToSend: () => String;
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = useState<Product[]>([]);

  function handleAddtoCart(product: Product) {
    setCart((cart) => cart.concat(product));
  }
  const textToSend = React.useMemo(() => {
    return cart
      .reduce(
        (message, product) =>
          message.concat(
            `*${product.title} - ${parseCurrency(product.price)}\n`
          ),
        ``
      )
      .concat(
        `\n Total: ${parseCurrency(
          cart.reduce((total, product) => total + product.price, 0)
        )}`
      );
  }, [cart]);
  return (
    <Stack>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack backgroundColor="gray.100" key={product.id}>
            <Text>{product.category}</Text>
            <Text>{product.title}</Text>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={150}
              objectFit="scale-down"
            />
            <Text>{product.description}</Text>
            <Text>{parseCurrency(product.price)}</Text>
            <Button onClick={() => handleAddtoCart(product)} colorScheme="blue">
              Agregar al carrito
            </Button>
          </Stack>
        ))}
      </Grid>
      {cart.length && (
        <Link
          href={`https://wa.me/54911414141?text=${encodeURIComponent(
            textToSend
          )}`}
          isExternal
        >
          <Button colorScheme="whatsapp">
            Completar pedido ({cart.length}) productos
          </Button>
        </Link>
      )}
    </Stack>
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
