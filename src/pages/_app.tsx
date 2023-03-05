import React from "react";
import type { AppProps } from "next/app";
import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import theme from "../theme";
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
          borderRadius="sm"
        >
          <VStack marginBottom={6}>
            <Image
              borderRadius={9999}
              src="https://placehold.it/128x128"
              alt="logo"
            />
            <Heading>Almacén</Heading>
            <Text>El más barato.</Text>
          </VStack>
          <Divider marginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
};
export default App;
