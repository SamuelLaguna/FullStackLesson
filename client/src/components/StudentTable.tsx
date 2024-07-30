import { useEffect, useState } from "react";
import {
  TableContainer,
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  Box,
  Flex,
  Heading,
  Avatar,
  Badge,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import { BASE_URL } from "../constant";
import StudentFrom from "./StudentFrom.tsx";
export interface Student {
  id: number;
  name: string;
  student: string;
  email: string;
  address: string;
  hobby: string;
}

const StudentTable = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentData, setcurrentData] = useState<Student>({} as Student);

  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Students/")
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

  const getStudent = (id: number) => {
    axios
      .get(BASE_URL + "Students/" + id)
      .then(() => {
        // setcurrentData(res.data);
        onOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(BASE_URL + "Students/" + id)
      .then(() => {
        toast({
          title: "Product Deleted",
          description: "Product Delted Noice",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdd = () => {
    onOpen();
    setcurrentData({} as Student);
  };

  return (
    <>
      <ColorModeSwitch />

      <Box m={12} shadow={"md"} rounded={"md"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} px={5}>
          <Heading>Student List</Heading>
          <Button
            onClick={() => handleAdd()}
            colorScheme="teal"
            leftIcon={<AddIcon />}
          >
            Add Product
          </Button>
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Adress</Th>
                <Th>Hobby</Th>
                <Th isNumeric>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
          
              {data.map((student: Student) => (
                <Tr>
                  <Td> {student.id}</Td>
                  <Td> {student.id}</Td>
                  <Td>
                    <HStack>
                      <Avatar size={"sm"} name={student.name} />
                      <Text>{student.name}</Text>
                    </HStack>
                  </Td>
                  <Td> {student.name}</Td>
                  <Td> {student.hobby}</Td>
                  <Td></Td>

                  <Td>
                    <HStack>
                      <EditIcon
                        onClick={() => getStudent(student.id)}
                        boxSize={23}
                        color={"orange.200"}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <DeleteIcon boxSize={23} color={"red.300"} />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Confirmation!</PopoverHeader>
                          <PopoverBody>
                            Are you sure you want to delete?
                          </PopoverBody>
                          <PopoverFooter>
                            <Button
                              colorScheme="red"
                              onClick={() => handleDelete(student.id)}
                            >
                              Delete
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>

                      <ViewIcon boxSize={23} color={"blue.100"} />
                    </HStack>
                  </Td>
                </Tr>
              ))}

        
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

        {data.length == 0 && (
          <Heading textAlign={"center"} fontSize={24}>
            No Data
          </Heading>
        )}
        {isOpen && (
          <StudentFrom
            currentData={currentData}
            fetchProduct={fetchData}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Box>
    </>
  );
};

export default StudentTable;

// function toast(arg0: {
//   title: string;
//   description: string;
//   status: string;
//   duration: number;
//   isClosable: boolean;
// }) {
//   throw new Error("Function not implemented.");
// }
