import type { FormikErrors } from "formik";
import type { NewCustomerFormInput } from "./NewCustomerModal";
import type { HandleChange, HandleBlur } from "@/types/formik";

interface CustomerFormViewProps {
    onCancel: () => void;
    onSubmit: () => void;
    visible: boolean;
    isPending: boolean;
    handleChange: HandleChange;
    handleBlur: HandleBlur;
    values: NewCustomerFormInput;
    errors: FormikErrors<NewCustomerFormInput>;
}

export const NewCustomerModalView: React.FC<CustomerFormViewProps> = ({ onCancel, onSubmit, visible, handleChange, handleBlur, values }) => {
    if (!visible) return null;

    return (
        <div className="light-mode fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center bg-overlay/70 px-4 outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:px-8 pt-(--modal-pt) pb-(--modal-pb) [--modal-pb:clamp(16px,8vh,64px)] [--modal-pt:16px] sm:[--modal-pb:32px] sm:[--modal-pt:32px]">
            <div className="rounded-xl bg-primary align-middle shadow-xl outline-hidden max-sm:overflow-y-auto sm:rounded-2xl max-h-[calc(var(--visual-viewport-height)-var(--modal-pt)-var(--modal-pb))] sm:max-w-160">
                <section className="relative max-h-[inherit] w-full overflow-y-auto outline-hidden">
                    <div className="relative">
                        <div className="flex flex-row justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max max-sm:hidden">
                                <div className="relative flex shrink-0 items-center justify-center *:data-icon:size-5 bg-primary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset size-10 rounded-lg text-fg-secondary">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true" className="z-1"><path d="M14.111 6.722h6.03c.447 0 .67 0 .801.094a.5.5 0 0 1 .205.348c.019.16-.09.356-.307.747l-1.47 2.645c-.079.142-.118.213-.133.288a.499.499 0 0 0 0 .201c.015.075.054.146.133.288l1.47 2.645c.217.391.326.587.307.747a.5.5 0 0 1-.205.348c-.13.094-.354.094-.802.094h-7.596c-.56 0-.84 0-1.053-.11a1 1 0 0 1-.438-.436c-.109-.214-.109-.494-.109-1.054v-2.623M7.25 21.5 3.028 4.611m1.583 6.333h7.9c.56 0 .84 0 1.054-.109a1 1 0 0 0 .437-.437c.11-.213.11-.493.11-1.054V4.1c0-.56 0-.84-.11-1.054a1 1 0 0 0-.437-.437c-.214-.109-.494-.109-1.054-.109H4.55c-.698 0-1.048 0-1.286.145a1 1 0 0 0-.438.56c-.082.267.003.605.172 1.283l1.614 6.456Z"></path></svg>
                                </div>
                            </div>

                            <button type="button" onClick={onCancel} className="flex items-center justify-center rounded-lg p-2 transition duration-100 ease-linear focus:outline-hidden size-9 text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:outline-2 focus-visible:outline-offset-2 outline-focus-ring">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" className="shrink-0 transition-inherit-all size-5"><path d="M17 7 7 17M7 7l10 10"></path></svg>
                            </button>
                        </div>
                        <div className="h-5 w-full"></div>
                            <div className="px-4 sm:px-6 z-10 flex flex-col gap-0.5"><h2 id="react-aria6042599094-_r_1_" slot="title" className="text-md font-semibold text-primary">Add customer</h2><p className="text-sm text-tertiary">Add a new customer to your database.</p></div>
                                <div className="h-5 w-full"></div>
                                    <div className="h-full w-full overflow-hidden">
                                        <div className="flex max-h-full gap-5">
                                            <div role="group" aria-roledescription="slide" className="min-w-0 shrink-0 grow-0 basis-full grid w-full grid-cols-1 items-start justify-start gap-4 px-4 sm:grid-cols-[280px_1fr] sm:px-6">
                                                <div data-input-wrapper="true" data-input-size="md" className="group flex h-max w-full flex-col items-start justify-start gap-1.5 sm:col-span-2" data-rac="">
                                                    <label className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary" id="react-aria6042599094-_r_5_" data-label="true">
                                                        Full name<span className="hidden text-brand-tertiary">*</span>
                                                    </label>
                                                    <div role="presentation" className="group/input relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset group-disabled:cursor-not-allowed group-disabled:opacity-50 group-invalid:ring-error_subtle" data-rac="">
                                                        <input
                                                            onChange={handleChange("fullName")}
                                                            onBlur={handleBlur("fullName")}
                                                            value={values.fullName}
                                                            placeholder="What is the full name of the customer?" id="react-aria6042599094-_r_4_" aria-labelledby="react-aria6042599094-_r_5_" className="m-0 w-full bg-transparent text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary disabled:cursor-not-allowed px-3 py-2 text-md" data-rac="" type="text" title="" />
                                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" className="pointer-events-none absolute hidden size-4 stroke-[2.25px] text-fg-error-secondary group-invalid/input:block right-3">
                                                            <path d="M12 16v-4m0-4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <template>
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset *:data-icon:shrink-0 *:data-icon:text-fg-quaternary py-2 px-3 gap-2 *:data-icon:size-5" data-rac="" role="group">
                                                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true" className="pointer-events-none">
                                                                <path d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"></path>
                                                            </svg>
                                                            <div className="relative flex w-full items-center"></div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <div className="sm:col-span-1" data-rac="">
                                                    <div className="flex flex-col gap-1.5">
                                                        <label className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary" id="react-aria6042599094-_r_e_" data-label="true">
                                                            Phone<span className="hidden text-brand-tertiary group-invalid:text-error-primary">*</span>
                                                        </label>
                                                        <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset *:data-icon:shrink-0 *:data-icon:text-fg-quaternary py-2 px-3 gap-2 *:data-icon:size-5" data-rac="" role="group">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z"
            stroke="#737373"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>

                                                <div className="relative flex w-full items-center">
                                                    <input
                                                        onChange={handleChange("phone")}
                                                        onBlur={handleBlur("phone")}
                                                        value={values.phone}
                                                        aria-autocomplete="list" placeholder="Customer's phone number" id="react-aria6042599094-_r_d_" aria-labelledby="react-aria6042599094-_r_e_" role="combobox" aria-expanded="false" className="z-10 w-full appearance-none bg-transparent text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed text-md" data-rac="" type="text" title="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-input-wrapper="true" data-input-size="md" className="group flex h-max w-full flex-col items-start justify-start gap-1.5 sm:col-span-1" data-rac="">
                                        <label className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary" data-label="true" id="react-aria6042599094-_r_l_">Email<span className="hidden text-brand-tertiary group-invalid:text-error-primary">*</span></label>
                                                                                <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset *:data-icon:shrink-0 *:data-icon:text-fg-quaternary py-2 px-3 gap-2 *:data-icon:size-5" data-rac="" role="group">
                                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
            stroke="#737373"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>

                                                <div className="relative flex w-full items-center">

                                                    <input
                                                        onChange={handleChange("email")}
                                                        onBlur={handleBlur("email")}
                                                        value={values.email}
                                                        aria-autocomplete="list" placeholder="example@gmail.com" id="react-aria6042599094-_r_t_" aria-labelledby="react-aria6042599094-_r_u_" role="combobox" aria-expanded="false" className="z-10 w-full appearance-none bg-transparent text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed text-md" data-rac="" type="text" title="" />
                                                </div>
                                            </div>
                                    </div>
                                    <template>
                                        <div className="flex flex-col gap-1.5">
                                            <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset *:data-icon:shrink-0 *:data-icon:text-fg-quaternary py-2 px-3 gap-2 *:data-icon:size-5" data-rac="" role="group">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true" className="pointer-events-none">
                                                    <path d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"></path>
                                                </svg>
                                                <div className="relative flex w-full items-center"></div>
                                                <div className="absolute inset-y-0.5 right-0.5 z-10 hidden items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-bg-primary to-40% pl-8 md:flex pr-2.5 sm:hidden"><span className="pointer-events-none rounded px-1 py-px text-xs font-medium text-quaternary ring-1 ring-secondary select-none ring-inset" aria-hidden="true">⌘K</span></div>
                                            </div>
                                        </div>
                                    </template>
                                    <div className="sm:col-span-1" data-rac="">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary" id="react-aria6042599094-_r_u_" data-label="true">Passport Number<span className="hidden text-brand-tertiary group-invalid:text-error-primary">*</span></label>
                                            <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset *:data-icon:shrink-0 *:data-icon:text-fg-quaternary py-2 px-3 gap-2 *:data-icon:size-5" data-rac="" role="group">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 16H14M8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
            stroke="#737373"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>

                                                <div className="relative flex w-full items-center">
                                                    <input
                                                        onChange={handleChange("passportNumber")}
                                                        onBlur={handleBlur("passportNumber")}
                                                        value={values.passportNumber}
                                                        aria-autocomplete="list" placeholder="Enter Passport Number" id="react-aria6042599094-_r_t_" aria-labelledby="react-aria6042599094-_r_u_" role="combobox" aria-expanded="false" className="z-10 w-full appearance-none bg-transparent text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed text-md" data-rac="" type="text" title="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        <template></template>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary" id="react-aria6042599094-_r_u_" data-label="true">Tazkira Number<span className="hidden text-brand-tertiary group-invalid:text-error-primary">*</span></label>
                                            <div className="relative flex w-full items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition-shadow duration-100 ease-linear ring-inset *:data-icon:shrink-0 *:data-icon:text-fg-quaternary py-2 px-3 gap-2 *:data-icon:size-5" data-rac="" role="group">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22 10H2M11 14H6M2 8.2L2 15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19L18.8 19C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5L5.2 5C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.07989 2 8.2Z"
            stroke="#737373"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>

                                                <div className="relative flex w-full items-center">
                                                    <input
                                                        onChange={handleChange("tazkiraNumber")}
                                                        onBlur={handleBlur("tazkiraNumber")}
                                                        value={values.tazkiraNumber}
                                                        aria-autocomplete="list" placeholder="Enter Tazkira Number" id="react-aria6042599094-_r_t_" aria-labelledby="react-aria6042599094-_r_u_" role="combobox" aria-expanded="false" className="z-10 w-full appearance-none bg-transparent text-transparent caret-alpha-black/90 placeholder:text-placeholder focus:outline-hidden disabled:cursor-not-allowed text-md" data-rac="" type="text" title="" />
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <button onClick={onCancel} className="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:opacity-50 in-data-input-wrapper:disabled:opacity-100 *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3 bg-primary text-secondary shadow-xs-skeuomorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover" data-rac="" type="button" data-react-aria-pressable="true" id="react-aria6042599094-_r_28_">
                                <span data-text="true" className="transition-inherit-all px-0.5">Cancel</span>
                            </button>
                            <button onClick={onSubmit} className="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:opacity-50 in-data-input-wrapper:disabled:opacity-100 *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5 in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:text-md in-data-input-wrapper:data-icon-only:p-3 bg-brand-solid text-white shadow-xs-skeuomorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover data-loading:bg-brand-solid_hover before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% *:data-icon:text-white/60 hover:*:data-icon:text-white/70" data-rac="" type="button" data-react-aria-pressable="true" id="react-aria6042599094-_r_2a_"><span data-text="true" className="transition-inherit-all px-0.5">Add customer</span></button>
                        </div>
                    </div>
                </section>
            </div>
        </div> 
    );
};