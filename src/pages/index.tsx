import api from "@/product/api";
import { Product } from "@/product/types";
import { Button, Flex, Grid, Image, Link, Stack, Text } from "@chakra-ui/react";
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
  const textToSend = useMemo(() => {
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
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack
            spacing={3}
            borderRadius="md"
            padding={4}
            backgroundColor="gray.100"
            key={product.id}
          >
            <Stack spacing={1}>
              <Text>{product.category}</Text>
              <Text>{product.title}</Text>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={150}
                objectFit="scale-down"
              />
            </Stack>
            <Text>{product.description}</Text>
            <Text fontSize="sm" fontWeight={500} color="green.500">
              {parseCurrency(product.price)}
            </Text>
            <Button
              onClick={() => handleAddtoCart(product)}
              colorScheme="primary"
              variant="outline"
              size="sm"
            >
              Agregar al carrito
            </Button>
          </Stack>
        ))}
      </Grid>
      {cart.length && (
        <Flex
          padding={4}
          position="sticky"
          bottom={0}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            isExternal
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/54911414141?text=${encodeURIComponent(
              textToSend
            )}`}
          >
            Completar pedido ({cart.length}) productos
          </Button>
        </Flex>
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
