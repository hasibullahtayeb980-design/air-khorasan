import type { HandleBlur, HandleChange } from "@/types/formik";
import type { FormikErrors } from "formik";
import { Mail01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import type { CustomerFormInput } from "./NewCustomerModal";
import { Modal } from "./Modal";

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
    <Modal onCancel={onCancel}>
      <Input
        isRequired
        icon={Mail01}
        label="Email"
        hint="This is a hint text to help user."
        placeholder="olivia@untitledui.com"
        tooltip="This is a tooltip"
      />
    </Modal>
  );
}