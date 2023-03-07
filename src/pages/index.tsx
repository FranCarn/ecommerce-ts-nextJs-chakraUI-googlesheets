import api from "@/product/api";
import { Product } from "@/product/types";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  function handleAddtoCart(product: Product) {
    setCart((cart) => cart.concat(product));
  }
  function handleCancel() {
    setIsDrawerOpen(false);
    setCart([]);
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
            <Text>{product.category}</Text>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={150}
              objectFit="scale-down"
            />
            <Stack spacing={1}>
              <Text>{product.title}</Text>
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
        <Flex position="sticky" bottom={4} justifyContent="center">
          <Button
            colorScheme="primary"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            Ver Carrito
          </Button>
        </Flex>
      )}
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Completar pedido</DrawerHeader>
          <DrawerBody>
            {cart.map((item) => (
              <Flex key={item.id} justifyContent="space-between">
                <Text>{item.title}</Text>
                <Text fontSize="sm" fontWeight={500} color="green.500">
                  {parseCurrency(item.price)}
                </Text>
              </Flex>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Stack>
              <Flex justifyContent="space-between" color="red.700">
                Total:{" "}
                <span>
                  {parseCurrency(
                    cart.reduce((total, product) => total + product.price, 0)
                  )}
                </span>
              </Flex>
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
              <Button
                variant="outline"
                colorScheme="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default IndexRoute;
