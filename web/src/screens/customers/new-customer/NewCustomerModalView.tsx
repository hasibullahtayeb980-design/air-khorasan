import type { HandleBlur, HandleChange } from "@/types/formik";
import type { FormikErrors } from "formik";
import { CreditCard02, Flag05, Mail01, Passport, Phone, Phone01 } from "@untitledui/icons";
import { Input } from "@/components/base/input/input";
import type { CustomerFormInput } from "./NewCustomerModal";
import { Modal } from "./Modal";
import { Button } from "@/components/base/buttons/button";
import { i18n, Translation } from "@/i18n";

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

export const NewCustomerModalView: React.FC<NewCustomerModalViewProps> = ({
  onCancel,
  onSubmit,
  visible,
  isPending,
  handleChange,
  handleBlur,
  values,
  errors,
}) => {
  return (
    <Modal
      title={i18n.t(Translation.customers.addCustomer.title)}
      description={i18n.t(Translation.customers.addCustomer.description)}
      icon={Flag05}
      onCancel={onCancel}
      visible={visible}
    >
      <div data-input-wrapper="true" data-input-size="md" className="group flex h-max w-full flex-col items-start justify-start gap-1.5 sm:col-span-2" data-rac="">
        <Input
          isRequired
          label={i18n.t(Translation.customers.addCustomer.inputFullNameLabel)}
          placeholder={i18n.t(Translation.customers.addCustomer.inputFullNamePlaceholder)}
          onChange={handleChange("fullName")}
          onBlur={handleBlur("fullName")}
          value={values.fullName}
          isInvalid={Boolean(errors.fullName)}
          hint={errors.fullName}
        />
      </div>

      <Input
        isRequired
        icon={Phone}
        label={i18n.t(Translation.customers.addCustomer.inputPhoneLabel)}
        placeholder={i18n.t(Translation.customers.addCustomer.inputPhonePlaceholder)}
        onChange={handleChange("phone")}
        onBlur={handleBlur("phone")}
        value={values.phone}
        isInvalid={Boolean(errors.phone)}
        hint={errors.phone}
      />

      <Input
        isRequired
        icon={Mail01}
        label={i18n.t(Translation.customers.addCustomer.inputEmailLabel)}
        placeholder={i18n.t(Translation.customers.addCustomer.inputEmailPlaceholder)}
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        value={values.email}
        isInvalid={Boolean(errors.email)}
        hint={errors.email}
      />

      <Input
        isRequired
        icon={Passport}
        label={i18n.t(Translation.customers.addCustomer.inputPassportNumberLabel)}
        placeholder={i18n.t(Translation.customers.addCustomer.inputPassportNumberPlaceholder)}
        onChange={handleChange("passportNumber")}
        onBlur={handleBlur("passportNumber")}
        value={values.passportNumber}
        isInvalid={Boolean(errors.passportNumber)}
        hint={errors.passportNumber}
      />

      <Input
        isRequired
        icon={CreditCard02}
        label={i18n.t(Translation.customers.addCustomer.inputTazkiraNumberLabel)}
        placeholder={i18n.t(Translation.customers.addCustomer.inputTazkiraNumberPlaceholder)}
        onChange={handleChange("tazkiraNumber")}
        onBlur={handleBlur("tazkiraNumber")}
        value={values.tazkiraNumber}
        isInvalid={Boolean(errors.tazkiraNumber)}
        hint={errors.tazkiraNumber}
      />

      <Button onClick={onCancel} color="secondary" size="md">{i18n.t(Translation.customers.addCustomer.buttonCancelLabel)}</Button>

      <Button
        disabled={isPending}
        isLoading={isPending}
        onClick={onSubmit}
        color="primary"
        size="md"
      >
        {i18n.t(Translation.customers.addCustomer.buttonSubmitLabel)}
      </Button>

      <div className="h-5 w-full"></div>
    </Modal>
  );
}