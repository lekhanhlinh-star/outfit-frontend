import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import Routes from "./router"

// import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
        <Routes />
  </ChakraProvider>
)
