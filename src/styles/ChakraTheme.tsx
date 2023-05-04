import { extendTheme } from "@chakra-ui/react"
import "@fontsource/open-sans";

const Theme = extendTheme({
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
})

export default Theme