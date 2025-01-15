
import { ChangeEvent, RefObject } from "react";

import { FormikErrors } from "formik";

export interface CommonSelectDropdownProps {
  options: number[];
  title: string;
  multiple?: boolean;
}

export interface FormDataTypes {
  firstName: string;
  lastName: string;
  username: string;
  city: string;
  state: string;
  zip: string;
}

export interface TooltipFormValidationProp {
  submitErrors: boolean;
  setSubmitError: (key: boolean) => void;
  errors: FormikErrors<FormDataTypes>;
}

export interface FormValidationProp {
  firstName: string;
  password: string;
  state: string;
  city: string;
  zip: string;
  payment: string;
  theme: string;
  file: string;
  description: string;
  terms: [];
}

export interface FormValidationsProp {
  submitErrors: boolean;
  setSubmitError: (key: boolean) => void;
  errors: FormikErrors<FormValidationProp>;
}

interface InlineCheckboxItem {
  id: number;
  type: "checkbox";
  check?: string;
  disabled?: string;
  text: string;
  formGroupClass?: string;
}
interface InlineRadioItem {
  id: number;
  type: "radio";
  check?: string;
  disabled?: string;
  name: string;
  text: string;
  formGroupClass?: string;
}

export interface InlineInputType {
  id: number;
  title: string;
  divClass?: string;
  child: (InlineCheckboxItem | InlineRadioItem)[];
}

interface CheckboxItem {
  id: string;
  labelText: string;
  check?: string;
  disabled?: string;
  groupClass?: string;
  name?: string;
}

export interface CheckboxGroup {
  id: number;
  title: string;
  child: CheckboxItem[];
}
export interface CommonCardFooterProps {
  footerClass?: string;
  color1: string;
  btn2Class?: string;
  btn1Class?: string;
  color2: string;
}

export interface CustomWizardFormPropsType {
  heading: string;
  horizontalWizardClass?: string;
  xs?: number;
  firstXl?: number;
  secondXl?: number;
  differentId?: boolean;
}

export interface BusinessFormCommonProps {
  activeTab?: number | undefined;
  callbackActive: (val: number | undefined) => void;
  differentId?: boolean;
}

export interface BankLogoListProp {
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  differentId?: boolean;
}

export interface BusinessFormPropsType {
  horizontalWizardClass?: string;
  heading: string;
  firstXl?: number;
  secondXl?: number;
  xs?: number;
}
export type StepperHorizontalPropsType = {
  level: number;
};

interface BasicInputFormValueInterFace {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  placeHolderName: string;
  cardNumber: string;
  expiration: string;
  cvvNumber: string;
  uploadDocumentation: string;
  informationCheckBox: boolean;
  linkedInLink: string;
  gitHubLink: string;
  giveFeedBack: string;
  state: string;
  agreeConditions: boolean;
}

export type NumberingWizardPropsType = {
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  basicInputFormValue: BasicInputFormValueInterFace;
  level?: number;
};

interface StudentValidationFormInterFace {
  password: string;
  name: string;
  email: string;
  confirmPassWord: string;
  portfolioURL: string;
  projectDescription: string;
  twitterUrl: string;
  gitHubUrl: string;
}

export interface StudentFormPropsType {
  handleImageLabelClick: () => void;
  imageUrl: string | null;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  studentValidationForm: StudentValidationFormInterFace;
  level: number;
  fileInputRef: RefObject<HTMLInputElement>;
}

export interface StudentTabProp {
  studentValidationForm: StudentValidationFormInterFace;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface VerticalFormPropsType {
  callbackActive: (val: number) => void;
  activeTab: number;
}

export interface VerticalValidationWizardFormPropsType {
  activeCallBack: (val: number) => void;
  activeTab?: number;
}

export interface CardPropsType {
  recipientUserName: string;
  userName: string;
  cardNumber: string;
  expirationDate: string;
  cvvNumber: string;
  documentationName: string;
}

export interface CardDetailProp {
  cartInfoForm: CardPropsType;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface NetBankingAccordionPropType {
  bankName: string;
  feedBack: string;
}

export interface NetBankingAccordionProp {
  netBankingFormValues: NetBankingAccordionPropType;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface NavComponentProp {
  callbackActive: (val: number | undefined) => void;
  activeTab: number | undefined;
}

export interface ShippingFormTabContentPropsType {
  activeTab: number | undefined;
  callbackActive: (val: number | undefined) => void;
}

export interface BillingFormProp {
  callbackActive: (val: number | undefined) => void;
}

interface StudentValidationFormType {
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  address: string;
  country: string;
  state: string;
  zip: string;
  rememberNextTime: boolean;
  otherNotes: string;
}

export interface BillingUserDetailsProp {
  studentValidationForm: StudentValidationFormType;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface RadioBoxValuesInterFace {
  address: string;
  shippingMethod: string;
}

export interface ShippingInformationCommonProps {
  handleNextButton?: () => void;
  radioBoxValues: RadioBoxValuesInterFace;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface PaymentMethodOptionPropsType {
  paymentMethodName: string;
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
}
export interface CommonTouchspinProp {
  color: string;
  id?: number;
  value: number;
  outline?: boolean;
  faAngle?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  btnClass?: string;
}

export interface CommonSwitchProp {
  defaultChecked?: boolean;
  color?: string;
  disabled?: boolean;
}

export interface CommonSwitchSpanProp {
  color: string;
  defaultChecked?: boolean;
}
export interface ButtonDropdownListProps {
  color: string;
  title?: string;
  options: string[];
  outline?: boolean;
  divider?: boolean;
  split?: boolean;
  span?: boolean;
}

export interface VerticalStyleItem {
  id: number;
  megaTitle: string;
  child: ChildFormItem[];
}

export interface StarItem {
  id: number;
  icon: string;
  class?: string;
}

export interface ChildFormItem {
  id: number;
  color: string;
  name: string;
  mediaBodyClass?: string;
  badgeTitle: string;
  digits: string;
  spanClass?: string;
  star?: StarItem[];
  spanText: string;
  colClass?: string;
  cardClass?: string;
  check?: string;
}

export interface VariationRadioProp {
  id: number;
  labelText: string;
  image?: string;
  icon?: React.ReactNode;
  name?: string;
  defaultChecked?: boolean;
  iconColor?: string;
}

interface StarProp {
  id: number;
  starClass?: string;
}

export interface VerticalStyleFormProp {
  id: number;
  color: string;
  cardClass?: string;
  name?: string;
  badgeTitle: string;
  mediaBodyClass?: string;
  digits: string;
  spanText: string;
  check?: boolean;
  spanClass?: string;
  star?: StarProp[];
}

interface StarProps {
  id: number;
  starClass?: string;
}

export interface HorizontalStyleFormProp {
  id: number;
  color: string;
  name: string;
  mediaBodyClass?: string;
  badgeTitle: string;
  digits: string;
  spanText: string;
  colClass?: string;
  check?: boolean;
  spanClass?: string;
  star?: StarProps[];
  cardClass?: string;
}

export interface CustomFormSelectProps {
  inputId: string;
  options: string[];
  title: string;
}

export interface CommonCardFooterProp {
  footerClass?: string;
  color1: string;
  btn2Class?: string;
  btn1Class?: string;
  color2: string;
}
