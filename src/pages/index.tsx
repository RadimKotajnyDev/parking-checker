import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Spot, Convert} from "./spot"
import {
  Grid,
  GridItem,
  Heading,
  Center,
  Flex
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function Home() {
  const initialSpot: Spot = {
    id : "",
    value : 0
  }
  const url = "./test.json"

  const [Spots, setSpot] = useState([initialSpot]);

  useEffect(() => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSpot(JSON.parse(data));
    })
  })

  return (
    <>
      <Center>
        <Flex flexDirection="column" align="center" justify="center">
          <Heading>Parking checker system</Heading>
          <Grid>
            {
              Spots.map((spot): any => {
                <GridItem key={spot.id}>{spot.value}</GridItem>
              })
            }
            <GridItem h={10} w={10} bg="teal.700" borderRadius="md"/>
          </Grid>
        </Flex>
      </Center>
    </>
  )
}
