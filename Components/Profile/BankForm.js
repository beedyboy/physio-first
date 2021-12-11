import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Box,
  Input,
  Stack,
  Button,
  Divider,
  useToast,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
const schema = {
  sin: {
    isEmpty: false,
    min: 1,
    message: "SIN is required",
  },
  staffId: {
    isEmpty: false,
    min: 1,
    message: "staffId is required",
  },
};
const BankForm = (props) => {
  const {
    reset,
    saved,
    error,
    action,
    sending,
    message,
    updateProfile,
    toggle,
    initial_data,
  } = props;
  // console.log({props})
  const toast = useToast();
  const [formState, setFormState] = useState({
    values: {
      sin: "",
      staffId: "",
    },
    touched: {},
    errors: {},
  });

  const [uploadImage, setUploadImage] = useState({
    touched: false,
    preview: "",
    file: "choose file",
  });
  const { touched, errors, values, isValid } = formState;
  useEffect(() => {
    let shouldSetData = typeof initial_data !== "undefined" ? true : false;
    if (shouldSetData) {
      const data = initial_data;
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          sin: data && data.sin,
          staffId: data && data.staffId,
        },
      }));
      if (data.cheque !== "") {
        setUploadImage((state) => ({
          ...state,
          touched: true,
          preview: data.cheque,
          file: "",
        }));
      }
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          sin: "",
          staffId: "",
        },
      }));
    };
  }, [initial_data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.sin.error || errors.staffId.error ? false : true,
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
  };
  useEffect(() => {
    if (saved === true && action === "payslipUpdated") {
      toast({
        title: "Server Response.",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      resetForm();
      toggle();
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      reset("action", "");
      resetForm();
      toggle();
    };
  }, [saved, action]);

  useEffect(() => {
    if (error === true && action === "payslipUpdateError") {
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
      toggle();
    };
  }, [error, action]);

  const hasError = (field) => touched[field] && errors[field].error;

  const readURI = (e) => {
    e.persist();
    let reader = new FileReader();
    if (e.target.files) {
      /* Get files in array form */
      const files = Array.from(e.target.files);
      // setUploadImage(files)
      reader.onloadend = () => {
        setUploadImage((state) => ({
          ...state,
          touched: true,
          preview: reader.result,
          file: files,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (var x = 0; x < uploadImage.file.length; x++) {
      fd.append("image", uploadImage.file[x]);
    }
    fd.append("sin", values.sin);
    updateProfile(fd);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        sin: "",
        staffId: "",
      },
      touched: {
        ...prev.touched,
        sin: false,
        staffId: false,
      },
      errors: {},
    }));
  };

  const firstField = React.useRef();

  return (
    <Fragment>
      <Stack spacing="24px">
        <Box>
          <FormControl isRequired my="3" isInvalid={hasError("sin")}>
            <FormLabel htmlFor="sin">SIN</FormLabel>
            <Input
              type="text"
              value={values.sin || ""}
              name="sin"
              id="sin"
              ref={firstField}
              onChange={handleChange}
              placeholder="Sin"
            />
            <FormErrorMessage>
              {hasError("sin") ? errors.sin && errors.sin.message : null}
            </FormErrorMessage>
          </FormControl>
        </Box>

        <Box>
          <FormControl my="3">
            <FormLabel htmlFor="image">Void Cheque</FormLabel>
            <Input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={readURI}
            />

            <FormHelperText color="red">
              {uploadImage.touched ? null : "Void Cheque is important"}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          {uploadImage.touched ? (
            <img
              src={uploadImage.preview}
              alt="First"
              style={{ width: "100%", height: 90 }}
            />
          ) : null}
        </Box>
      </Stack>
      <Button variant="outline" disabled={sending} mr={3} onClick={toggle}>
        Cancel
      </Button>
      <Button
        disabled={!isValid || sending}
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
        Save Changes
      </Button>
    </Fragment>
  );
};

export default BankForm;
