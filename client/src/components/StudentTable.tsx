import { useEffect, useState} from "react";
import { TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Button, Box, Flex, Heading } from "@chakra-ui/react"
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import { BASE_URL } from "../constant";
interface TableProps{
  id: number;
  student: string;
  Email: string;
  Hobby: string;
  
}

const StudentTable = () => {

  const [data, setData] = useState<TableProps[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
  axios
      .get(BASE_URL + "Students")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
         setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>

    
 
   <ColorModeSwitch/>

    <Box m={12} shadow={'md'} rounded={'md'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} px={5}>
        <Heading>
          Student List 
        </Heading>
        <Button colorScheme="green">Add Student</Button>
      </Flex>



   
   
    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Adress</Th>
        <Th>Phone Number</Th>
        <Th isNumeric>Email</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td>millimetres (mm)</Td>

        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
    </Box>
    </>
  )
}

export default StudentTable

function useState<T>(arg0: never[]): [any, any] {
  throw new Error("Function not implemented.");
}
