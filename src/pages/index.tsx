import Image from 'next/image'
import {Inter} from 'next/font/google'
import {
  Grid,
  GridItem,
  Heading,
  Center,
  Flex
} from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Center>
        <Flex flexDirection="column" align="center" justify="center">
          <Heading>Parking checker system</Heading>
          <Grid>
            <GridItem h={10} w={10} bg="teal.700" borderRadius="md"/>
          </Grid>
        </Flex>
      </Center>
    </>
  )
}
