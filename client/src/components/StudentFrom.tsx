import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  VStack,
  Textarea,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../constant";
import axios from "axios";
import { Student } from "./StudentTable";
import { useToast } from "@chakra-ui/react";

interface ProductFromProps {
  isOpen: boolean;
  onClose: () => void;
  fetchProduct: () => void;
  currentData?: Student;
}

const StudentFrom = ({
  isOpen,
  onClose,
  fetchProduct,
  currentData,
}: ProductFromProps) => {
 

  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || "",
    email: currentData?.email || "",
    address: currentData?.address || "",
    hobby: currentData?.hobby || "",
  });

  const onSave = () => {
    console.log(currentData);
    
    if (currentData?.id) {
      editProduct();
      console.log("edidt");
      
    } else {
      addStudent();
    }
  };

  const editProduct = () => {
    axios
      .put(BASE_URL + "Students/" + currentData?.id, product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Product Updated.",
          description: "Product Updated Succesfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addStudent = () => {
    axios
      .post(BASE_URL + "Students/", product)
      .then(() => {
        onClose();
        fetchProduct();
        toast({
          title: "Student Added",
          description: "Student Added Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            

            <VStack alignItems={"self-start"} gap={3}>
              <Input
                type="text"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={product.email}
                onChange={(e) =>
                  setProduct({ ...product, email: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Address"
                value={product.address}
                onChange={(e) =>
                  setProduct({ ...product, address: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Hobby"
                value={product.hobby}
                onChange={(e) =>
                  setProduct({ ...product, hobby: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          {/* {JSON.stringify({product})} */}
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onSave} variant="ghost" colorScheme="teal">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudentFrom;
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
}) {
  throw new Error("Function not implemented.");
}
