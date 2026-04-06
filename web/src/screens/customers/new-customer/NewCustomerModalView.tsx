import type { HandleBlur, HandleChange } from "@/types/formik";
import type { FormikErrors } from "formik";
import { CreditCard02, Flag05, Mail01, Passport, Phone, Phone01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import type { CustomerFormInput } from "./NewCustomerModal";
import { Modal } from "./Modal";
import { Button } from "@/components/base/buttons/button";

interface NewCustomerModalViewProps {
  onCancel: () => void;
  onSubmit: () => void;
  visible: boolean;
  isPending: boolean;
  handleChange: HandleChange;
  handleBlur: HandleBlur;
  values: CustomerFormInput;
  errors: FormikErrors<CustomerFormInput>;
}

export const NewCustomerModalView: React.FC<NewCustomerModalViewProps> = ({ visible, onCancel }) => {
  return (
    <Modal
      title="Add Customer"
      description="Add a new customer to your database."
      icon={Flag05}
      onCancel={onCancel}
    >
      <div data-input-wrapper="true" data-input-size="md" className="group flex h-max w-full flex-col items-start justify-start gap-1.5 sm:col-span-2" data-rac="">
        <Input
          isRequired
          label="Full Name"
          placeholder="What is the full name of the customer?"
        />
      </div>

      <Input
        isRequired
        icon={Phone}
        label="Phone"
        placeholder="Customer's phone number"
      />

      <Input
        isRequired
        icon={Mail01}
        label="Email"
        placeholder="example@gmail.com"
      />

      <Input
        isRequired
        icon={Passport}
        label="Passport Number"
        placeholder="Enter passport number"
      />

      <Input
        isRequired
        icon={CreditCard02}
        label="Tazkira Number"
        placeholder="Enter tazkira number"
      />

      <Button onClick={onCancel} color="secondary" size="md">Cancel</Button>
      <Button color="primary" size="md">Add Customer</Button>

      <div className="h-5 w-full"></div>
    </Modal>
  );
}