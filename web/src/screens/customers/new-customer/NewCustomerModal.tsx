import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import type React from "react";
import * as yup from "yup";
import { NewCustomerModalView } from "./NewCustomerModalView";
import type { Customer, CustomerInput } from "@/services/AKClient";
import { akClient } from "@/services";
import { QUERY_CUSTOMERS_KEY } from "@/services/queries";

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

type CustomerPartialFormInput = Omit<CustomerInput, "passportNumber" | "tazkiraNumber" | "avatarImageUrl">;

export interface CustomerFormInput extends CustomerPartialFormInput {
  passportNumber: string;
  tazkiraNumber: string;
}

export const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ visible, onCancel, onSuccess}) => {
  const queryClient = useQueryClient();

  const createCustomerMutation = useMutation({
    mutationFn: (input: CustomerInput) => akClient.createCustomer(input),
  });

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

      const customer = await createCustomerMutation.mutateAsync(
        input
      );

      console.log("New customer added with ID:", customer?.id);

      addCustomer(customer);
      onSuccess();
    } catch (error) {
        console.error("Error creating customer:", error);
    }
  };

  const addCustomer = (customer: Customer) => {
    queryClient.setQueryData(
      [QUERY_CUSTOMERS_KEY, 1],
      (data: any) => {
        data.items.splice(-1);
        data.items.unshift(customer);

        return {
          ...data,
        }
      }
    );
  };

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