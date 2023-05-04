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
    value: number;
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

function uniqueLetterCount(Spots: Spot[]): number {
    let newArray: String[] = ["a"]

    Spots.map((spot: Spot): void => {
        newArray.push(spot.id[0])
    })
    //let uniqueChars: String[] = [...new Set(newArray)]
    //return uniqueChars.length
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
        value: 0
    }
    const url = "/test.json"

    const [Spots, setSpots] = useState([initialSpot]);
    const { data, error } = useSWR(url, fetcher, { refreshInterval: 5000})

    // remove initial state collision
    useEffect(() => {
        setSpots([])
    }, [])
    useEffect(() => {
        //console.log(error)
        setSpinner(true)
        if (data) {
            data.map((item: Spot) => {
                if(item) {
                    //console.log(item)
                    Spots.push(item)
                }
            })
            setSpots([...Spots])
            setSpinner(false)
        }
    }, [data, error])

    let color: string
    let sectors = [...Array(Math.round(uniqueLetterCount(Spots)/2)).keys()]
    return (
        <>
            <Center>
                <Flex flexDirection="column" align="center" justify="center">
                    <Heading>Parking checker system</Heading>

                    <Popover>
                        <PopoverTrigger>
                            <Button>Legend</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
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


                    <p>{maxLetterCount(Spots, "b")}</p>
                    <p>{uniqueLetterCount(Spots)}</p>
                    <Flex>{ spinner ? (<Spinner size="xl" color="teal.500" />) : (
                        <Flex>
                            {
                                sectors.map((sector))
                            }
                        </Flex>
                        )}
                    </Flex>
                </Flex>
            </Center>
        </>
    )
}
