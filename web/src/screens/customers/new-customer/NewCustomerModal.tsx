import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import type React from "react";
import * as yup from "yup";
import { NewCustomerModalView } from "./NewCustomerModalView";

const newCustomerValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required(),
  phone: yup
    .string()
    .required(),
  email: yup
    .string()
    .email(),
  passportNumber: yup
    .number()
    .required()
    .positive()
    .integer(),
  tazkiraNumber: yup
    .number()
    .required()
    .positive()
    .integer(),
});

export interface NewCustomerFormInput {
    fullName: string;
    phone: string;
    email: string;
    passportNumber: string;
    tazkiraNumber: string;
}

interface NewCustomerModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

interface CreateCustomerInput {
    fullName: string;
    phone: string;
    email: string;
    passportNumber: number;
    tazkiraNumber: number;
    avatarImageUrl: string;
}

interface Customer extends CreateCustomerInput {
  id: string;
}

const createCustomer = async (input: CreateCustomerInput): Promise<Customer | null> => {
  return null;
}

export const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ visible, onCancel, onSuccess}) => {
    const queryClient = useQueryClient();

  const createCustomerMutation = useMutation({
    mutationFn: async (input: CreateCustomerInput) =>
      createCustomer(input),
  });

  const handleSubmit = async (
    values: NewCustomerFormInput
  ) => {
    try {
        const input: CreateCustomerInput = {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email,
            passportNumber: Number(values.passportNumber),
            tazkiraNumber: Number(values.tazkiraNumber),
            avatarImageUrl: "https://cdn-icons-png.flaticon.com/128/149/149071.png"
        };

        const customer = await createCustomerMutation.mutateAsync(
            input
        );

        console.log("New customer added with ID:", customer?.id);

        //addCustomer(customer);
        onSuccess();
    } catch (error) {
        console.error("Error creating customer:", error);
    }
  };

  /*const addCustomer = (customer: Customer) => {
    queryClient.setQueryData(
      [QUERY_USER_QUOTES_KEY],
      (data: InfiniteData<QuotesResponse>) => {
        return {
          ...data,
          pages: [
            {
              ...data.pages[0],
              quotes: [quote, ...data.pages[0].quotes],
            },
            ...data.pages.slice(1),
          ],
        };
      }
    );
  };*/

  return (
    <Formik
      initialValues={{
        fullName: "",
        phone: "",
        email: "",
        passportNumber: "",
        tazkiraNumber: "",
    }}
      validationSchema={newCustomerValidationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <NewCustomerModalView
            visible={visible}
            onCancel={onCancel}
            onSubmit={() => handleSubmit()}
            isPending={createCustomerMutation.isPending}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
        />
      )}
    </Formik>
  );
}