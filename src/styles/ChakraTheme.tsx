import { extendTheme } from "@chakra-ui/react"
import "@fontsource/montserrat"

const Theme = extendTheme({
  fonts: {
    //Heading: `"Montserrat", sans-serif;`,
    body: `"Montserrat", sans-serif;`,
  },
})

export default Theme