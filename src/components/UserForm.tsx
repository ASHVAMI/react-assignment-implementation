import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { addUser, setUnsavedChanges } from '../store/userSlice';
import { RootState } from '../store';
import { UserData } from '../types';

const UserForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const unsavedChanges = useSelector((state: RootState) => state.user.unsavedChanges);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedChanges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    dispatch(setUnsavedChanges(true));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData: UserData = {
      id: uuidv4(),
      ...formData,
    };

    dispatch(addUser(userData));
    setFormData({
      name: '',
      email: '',
      address: '',
      phone: '',
    });

    toast({
      title: 'Success',
      description: 'User data saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} maxW="xl" mx="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Save User Data
          </Button>
        </VStack>
      </form>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unsaved Changes</ModalHeader>
          <ModalBody>
            You have unsaved changes. Are you sure you want to leave?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => setShowModal(false)}>
              Stay
            </Button>
            <Button variant="ghost" onClick={() => window.close()}>
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserForm;