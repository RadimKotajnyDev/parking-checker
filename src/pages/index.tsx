import {
  Center, Flex, Grid, GridItem, Heading, Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor, Button, UnorderedList, ListItem, Box, Text, Spacer
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import useSWR from "swr";

interface Spot {
  id: string;
  status: number;
}

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L",
  "M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const fetcher = (url: string) => fetch(url).then(r => r.json())

function uniqueLetterCount(Spots: Spot[]): number {
  let newArray: String[] = ["a"]

  Spots.map((spot: Spot): void => {
    newArray.push(spot.id[0])
  })
  let uniqueChars: String[] = [...new Set(newArray)]
  return uniqueChars.length
}

function maxLetterCount(Spots: Spot[], letter: string): number {
  let count = 0

  for (let i = 0; i < Spots.length; i++) {
    if (Spots[i].id[0] === letter) {
      count += 1;
    }
  }
  return count
}

export default function Home() {

  const [spinner, setSpinner] = useState(false);

  const initialSpot: Spot = {
    id: "",
    status: 0
  }
  const url = "/test.json"

  const [Spots, setSpots] = useState([initialSpot]);
  const {data, error} = useSWR(url, fetcher, {refreshInterval: 5000})
  // remove initial state collision
  useEffect(() => {
    setSpots([])
  }, [])
  useEffect(() => {
    //console.log(error)
    setSpinner(true)
    if (data) {
      data.map((item: Spot) => {
        if (item) {
          //console.log(item)
          Spots.push(item)
        }
      })
      setSpots([...Spots])
      setSpinner(false)
    }
  }, [data, error])
  let Incrementer: number = 0
  let color: string
  let sectors = [...Array(Math.round(uniqueLetterCount(Spots) / 2)).keys()]
  return (
    <>
      <Center>
        <Flex flexDirection="column" align="center" justify="center">
          <Heading mb={2}>Parking checker system</Heading>
          <Popover>
            <PopoverTrigger>
              <Button>Legend</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow/>
              <PopoverCloseButton/>
              <PopoverHeader>Legend</PopoverHeader>
              <PopoverBody>
                <Flex flexDirection="row" my={2}>
                  <Box p={3} bg="teal.500" borderRadius="md"></Box>&nbsp;<Text>is free</Text>
                </Flex>
                <Flex flexDirection="row" my={2}>
                  <Box p={3} bg="red.500" borderRadius="md"></Box>&nbsp;<Text>is occupied</Text>
                </Flex>
                <Flex flexDirection="row" my={2}>
                  <Box p={3} bg="purple.500" borderRadius="md"></Box>&nbsp;<Text>is unknown</Text>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Flex>{spinner ? (<Spinner size="xl" color="teal.500"/>) : (
            <Flex>
              {
                sectors.map((sector: number) => {
                  Incrementer += 1
                  return <Flex bg="blackAlpha.500"
                               direction="row"
                               key={sector}
                               w="fit" m={5} p={5} borderRadius="md"
                  >
                    <Flex direction="column">
                      {Spots.map(current => {
                        if(current.id[0] == alphabet[sector + Incrementer - 1].toLowerCase()) {
                          if (current.status === 1) color = "teal.500"
                          else if (current.status === 2) color = "red.500"
                          else color = "purple.500"
                          return <Box p={3} px={5} m={3} bg={color} borderRadius="md"
                                      key={current.id} className="uppercase">{current.id}</Box>
                        }
                      })}
                    </Flex>
                    <Flex direction="column">
                      {Spots.map(current => {
                        if(current.id[0] == alphabet[sector + Incrementer].toLowerCase()) {
                          if (current.status === 1) color = "teal.500"
                          else if (current.status === 2) color = "red.500"
                          else color = "purple.500"
                          return <Box p={3} px={5} m={3} bg={color} borderRadius="md"
                                      key={current.id} className="uppercase">{current.id}</Box>
                        }
                      })}
                    </Flex>
                  </Flex>
                })
              }
            </Flex>
          )}
          </Flex>
        </Flex>
      </Center>
    </>
  )
}
