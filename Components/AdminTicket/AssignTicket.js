import React, { Fragment, useEffect, useState } from 'react'  
import {
  Box,
  Stack,
  Button,
  Select,
  useToast,
  FormLabel,
  FormControl,
} from "@chakra-ui/react"; 
const AssignTicket   = ({ data, sending, loading, getUsers, users, assignManager, action, reset, error, toggle }) => {
      const toast = useToast(); 
    const [formState, setFormState] = useState({
        assigned_to: '',
        id: ''
    }); 
    useEffect(() => {
      getUsers(); 
      }, [])
       
      useEffect(() => { 
            setFormState(state => ({
                ...state,
                id: data._id
            }))
      }, [data]);

 
      useEffect(() => {
        if (action === "managerAssignedError") {
            toast({
              title: "Server Response.",
              description: message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top-right",
            });
          } else if(action === "managerAssigned") {
            toast({
                title: "Server Response.",
                description: message,
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top-right",
              });
          }
        return () => {
          reset("error", false);
          reset("action", "");
          reset("message", "");
          resetForm();
          toggle('assign');
        };
      }, [action]);
const handleChange = e => {   
    setFormState(state => ({
        ...state,
        assigned_to: e.target.value
    }))
  }
const handleSubmit = e => {
    e.preventDefault();
    assignManager(formState)
} 

const resetForm = () => {
  setFormState((prev) => ({
    ...prev, 
      id: "",
      assigned_to: "", 
    touched: {},
    errors: {},
  }));
};
    return (
        
         <Fragment>
         <form noValidate autoComplete="off" onSubmit={handleSubmit}>
           <Stack spacing="24px" boxShadow="base" p="6" rounded="md" bg="white">
             <Box>
               <FormControl my="3">
                 <FormLabel htmlFor="assigned_to">Staff</FormLabel>
                 <Select
                   value={formState.assigned_to}
                   placeholder="Select Manager"
                   name="assigned_to"
                   id="assigned_to"
                   onChange={handleChange}
                 >
                 {users && users.map((user) =>(
                      <option key={user._id} value={user._id}>{`${user.firstname} ${user.lastname} `}</option>
                 ))}
                 </Select>
               </FormControl>
             </Box>
           </Stack>
   
           <Button
             disabled={sending}
             colorScheme="blue"
             onClick={handleSubmit}
             isLoading={sending}
             bg="brand.mainAccent"
             color="brand.white"
             variant="ghost"
             _hover={{
               borderColor: "brand.mainAccent",
               bg: "brand.white",
               color: "brand.mainAccent",
               boxShadow: "md",
             }}
             _focus={{}}
           >
             Update Status
           </Button>
         </form>
       </Fragment>
    )
}

export default AssignTicket;
