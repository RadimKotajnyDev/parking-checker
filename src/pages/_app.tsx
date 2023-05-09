import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import Theme from '../styles/ChakraTheme'
import '../styles/Globals.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider theme={Theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
