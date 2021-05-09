import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Radio,
  Button,
  Drawer,
  Select,
  useToast,
  Textarea,
  FormLabel,
  RadioGroup,
  DrawerBody,
  FormControl,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  FormErrorMessage,
  DrawerCloseButton,
} from "@chakra-ui/react";
const schema = {
  name: {
    isEmpty: false,
    min: 1,
    message: "Asset name is required",
  },
  cat_id: {
    isEmpty: false,
    min: 1,
    message: "Category is required",
  },
  sub_id: {
    isEmpty: false,
    min: 1,
    message: "Sub Category is required",
  },
  purchased_price: {
    isEmpty: false,
    message: "Purchased price is required",
  },
};
const AssetForm = ({
  mode,
  open,
  reset,
  saved,
  error,
  exist, 
  sending,
  message, 
  getCategoryBySub,
  categorysubs,
  createAsset,
  categories,
  updateAsset,
  handleClose,
  initial_data,
}) => {
  const toast = useToast();
  const [title, setTitle] = useState("Add Asset");
  
  const [formState, setFormState] = useState({
    values: {
      id: "",
      name: "",
      cat_id: "",
      sub_id: "",
      purchased_price: "",
      serial: "",
      condition: "New",
      description: "",
      purchased_date: "",
      start_date: "",
      end_date: "",
      company_name: "",
    },
    touched: {},
    errors: {},
  });

  const { touched, errors, values, isValid } = formState;

  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Asset");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        getSubCategory(data.cat_id);
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            name: data && data.title,
            condition: data && data.condition,
            cat_id: data && data.cat_id,
            sub_id: data && data.sub_id,
            purchased_price: data && data.purchased_price,
            purchased_date: data && data.purchased_date,
            start_date: data && data.start_date,
            end_date: data && data.end_date,
            company_name: data && data.company_name,
            serial: data && data.serial,
            description: data && data.description,
          },
        }));
        handleButtonTab(data.condition);
      }
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          name: "",
          cat_id: "",
          sub_id: "",
          purchased_price: "",
          purchased_date: "",
          serial: "",
          condition: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.name.error || errors.purchased_price.error ? false : true,
      errors: errors || {},
    }));
  }, [values]);

 

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));

    if (event.target.name === "cat_id") {
      getSubCategory(event.target.value);
    }
    // if (event.target.name === "email") {
    //   confirm(event.target.value);
    // }
  };
  const getSubCategory = (cat_id) => { 
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        sub_id: "",
      },
    }));
    if (cat_id.length !== "") {
      getCategoryBySub(cat_id);
    }
  };
  useEffect(() => {
    if (saved === true) {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
      handleClose();
    }
    return () => {
      reset("saved", false);
      reset("message", ""); 
      resetForm();
      handleClose();
    };
  }, [saved]);

  useEffect(() => {
    if (error === true) {
      toast({
        title: "Server Response.",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    return () => {
      reset("error", false);
      reset("message", "");
      reset("action", "");
      resetForm();
      handleClose();
    };
  }, [error]);

  const hasError = (field) => touched[field] && errors[field].error;

  const resetForm = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        id: "",
        name: "",
        cat_id: "",
        sub_id: "",
        purchased_price: "",
        serial: "",
        condition: "New",
        description: "",
        purchased_date: "",
        start_date: "",
        end_date: "",
        company_name: "",
      },
      touched: {
        ...formState.touched,
        name: false,
        cat_id: false,
        sub_id: false,
        purchased_price: false,
        serial: false,
        condition: false,
        description: false,
        purchased_date: false,
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createAsset(formState.values)
      : updateAsset(formState.values);
  }; 
  return (
    <Fragment>
      <Drawer
        isOpen={open}
        placement="right" 
        onClose={handleClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl isRequired my="3" isInvalid={hasError("name")}>
                    <FormLabel htmlFor="name">Title</FormLabel>
                    <Input
                      type="text"
                      value={values.name || ""}
                      name="name"
                      id="name"
                      onChange={handleChange}
                      placeholder="name"
                    />
                    <FormErrorMessage>
                      {hasError("name")
                        ? errors.name && errors.name.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired my="3" isInvalid={hasError("cat_id")}>
                    <FormLabel htmlFor="cat_id">Category</FormLabel>
                    <Select
                      value={values.cat_id || ""}
                      placeholder="Select option"
                      name="cat_id"
                      id="cat_id"
                      onChange={handleChange}
                    > 
                      {categories &&
                        bracategoriesnches.map((val, index) => (
                          <option value={val._id} key={index}>
                            {val.name}
                          </option>
                        ))}
                    </Select>

                    <FormErrorMessage>
                      {hasError("cat_id")
                        ? errors.cat_id && errors.cat_id.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired my="3" isInvalid={hasError("sub_id")}>
                    <FormLabel htmlFor="sub_id">Sub</FormLabel>
                    <Select
                      value={values.sub_id || ""}
                      placeholder="Select option"
                      name="sub_id"
                      id="sub_id"
                      onChange={handleChange}
                    >
                      {/* <option>Select One</option> */}
                      {categorysubs &&
                        categorysubs.map((val, index) => (
                          <option value={val._id} key={index}>
                            {val.sub_name}
                          </option>
                        ))}
                    </Select>

                    <FormErrorMessage>
                      {hasError("sub_id")
                        ? errors.cat_id && errors.sub_id.message
                        : null}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="purchased_price">
                      purchased price
                    </FormLabel>
                    <Input
                      type="text"
                      value={values.purchased_price || ""}
                      name="purchased_price"
                      id="purchased_price"
                      onChange={handleChange}
                      placeholder="purchased_price"
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="serial">Serial</FormLabel>
                    <Input
                      type="text"
                      value={values.serial || ""}
                      name="serial"
                      id="serial"
                      onChange={handleChange}
                      placeholder="serial"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="condition">Condition</FormLabel>
                    <RadioGroup
                      onChange={handleChange}
                      value={values.condition}
                    >
                      <Stack spacing={4} direction="row">
                        <Radio value="New">New</Radio>
                        <Radio value="Leased">Leased</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Box>
                {values.condition === "Leased" ? (
                  <>
                    <Box>
                      <FormControl my="3">
                        <FormLabel htmlFor="start_date">Start Date</FormLabel>
                        <Input
                          type="text"
                          value={values.start_date || ""}
                          name="start_date"
                          id="start_date"
                          onChange={handleChange}
                          placeholder="start_date"
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl my="3">
                        <FormLabel htmlFor="end_date">End Date</FormLabel>
                        <Input
                          type="text"
                          value={values.end_date || ""}
                          name="end_date"
                          id="end_date"
                          onChange={handleChange}
                          placeholder="end_date"
                        />
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl my="3">
                        <FormLabel htmlFor="company_name">
                          Company name
                        </FormLabel>
                        <Input
                          type="text"
                          value={values.company_name || ""}
                          name="company_name"
                          id="company_name"
                          onChange={handleChange}
                          placeholder="company_name"
                        />
                      </FormControl>
                    </Box>
                  </>
                ) : null}
                {values.condition === "New" ? (
                  <Box>
                    <FormControl my="3">
                      <FormLabel htmlFor="purchased_date">
                        Purchased date
                      </FormLabel>
                      <Input
                        type="text"
                        value={values.purchased_date || ""}
                        name="purchased_date"
                        id="purchased_date"
                        onChange={handleChange}
                        placeholder="purchased_date"
                      />
                    </FormControl>
                  </Box>
                ) : null}
                <Box>
                  <FormControl my="3">
                    <FormLabel htmlFor="description">Description</FormLabel>

                    <Textarea
                      value={values.description || ""}
                      name="description"
                      id="description"
                      onChange={handleChange}
                      placeholder="Enter description"
                    />
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button
                variant="outline"
                disabled={sending}
                mr={3}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid || sending || exist}
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
                Save Asset
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
};

export default AssetForm;
