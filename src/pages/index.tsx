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

    const [Spots, setSpot] = useState([initialSpot]);

    const { data, error } = useSWR(url, fetcher)

    useEffect(() => {
        //console.log(error)
        if (data) {
            data.map((item: Spot) => {
                if(item) {
                    console.log(item)
                    Spots.push(item)
                }
            })
            setSpot([...Spots])
        }
    }, [data, error])
    let color: string
    return (
        <>
            <Center>
                <Flex flexDirection="column" align="center" justify="center">
                    <Heading>Parking checker system</Heading>
                    <Grid>
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
                                              key={id}>{id}&nbsp;{value}</GridItem>
                                )
                            })
                        }
                        <GridItem h={10} w={10} bg="teal.700" borderRadius="md"/>
                    </Grid>
                </Flex>
            </Center>
        </>
    )
}
