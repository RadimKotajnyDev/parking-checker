import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import "@fontsource/montserrat"
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true
};


const Theme = extendTheme({config} ,{
  fonts: {
    //Heading: `"Montserrat", sans-serif;`,
    body: `"Montserrat", sans-serif;`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.800')(props),
      },
    }),
  },
})

export default Theme