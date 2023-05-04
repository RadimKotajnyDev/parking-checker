import {Spot, Convert} from "./spot"
import {Center, Flex, Grid, GridItem, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Home() {
    const initialSpot: Spot = {
        id: "",
        value: 0
    }
    const url = "/test.json"

    const [Spots, setSpots] = useState([initialSpot]);
    const { data, error } = useSWR(url, fetcher)

    // remove initial state collision
    useEffect(() => {
        setSpots([])
    }, [])
    useEffect(() => {
        //console.log(error)
        if (data) {
            data.map((item: Spot) => {
                if(item) {
                    console.log(item)
                    Spots.push(item)
                }
            })
            setSpots([...Spots])
        }
    }, [data, error])
    let color: string
    return (
        <>
            <Center>
                <Flex flexDirection="column" align="center" justify="center">
                    <Heading>Parking checker system</Heading>
                    <Grid templateColumns='repeat(5, 1fr)' gap={1}
                          bg="blackAlpha.300"
                          p={10} borderRadius="xl">
                        {
                            Spots.map((spot): any => {
                                const {id, value} = spot
                                if (value === 1) color = "teal.500"
                                if (value === 2) color = "red.500"
                                if (value === 3) color = "purple.500"
                                return (
                                    <GridItem bg={color}
                                              h={10} w={10} p={1}
                                              borderRadius="md"
                                              key={id}>{id}</GridItem>
                                )
                            })
                        }
                    </Grid>
                </Flex>
            </Center>
        </>
    )
}
