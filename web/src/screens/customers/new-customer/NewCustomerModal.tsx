import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import type React from "react";
import * as yup from "yup";
import { NewCustomerModalView } from "./NewCustomerModalView2";
import type { Customer } from "@/services/AKClient";

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

interface NewCustomerModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
}

type CustomerInput = Omit<Customer, "id" | "createdAt">
type CustomerPartialFormInput = Omit<CustomerInput, "passportNumber" | "tazkiraNumber" | "avatarImageUrl">;

export interface CustomerFormInput extends CustomerPartialFormInput {
  passportNumber: string;
  tazkiraNumber: string;
}

export const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ visible, onCancel, onSuccess}) => {
    const queryClient = useQueryClient();

  const handleSubmit = async (
    values: CustomerFormInput
  ) => {
    try {
        const input: CustomerInput = {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email,
            passportNumber: Number(values.passportNumber),
            tazkiraNumber: Number(values.tazkiraNumber),
            avatarImageUrl: "https://cdn-icons-png.flaticon.com/128/149/149071.png"
        };

        /* const customer = await createCustomerMutation.mutateAsync(
            input
        );

        console.log("New customer added with ID:", customer?.id);*/

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
            isPending={false}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
        />
      )}
    </Formik>
  );
}