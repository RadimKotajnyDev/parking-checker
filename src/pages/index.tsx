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
    const url = "./test.json"

    const [Spots, setSpot] = useState([initialSpot]);

    const { data, error } = useSWR(url, fetcher)

    useEffect(() => {
        console.log(error)
        setSpot(Convert.toSpot(data))
    }, [data, error])

    return (
        <>
            <Center>
                <Flex flexDirection="column" align="center" justify="center">
                    <Heading>Parking checker system</Heading>
                    <Grid>
                        {
                            Spots.map((spot): any => {
                                const {id, value} = spot
                                return (
                                    <GridItem key={id}>{value}</GridItem>
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
