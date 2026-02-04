import { BasePage } from "../types";

export type StepContentType = 
  | "title" 
  | "paragraph" 
  | "subtitle" 
  | "question" 
  | "helper-text" 
  | "input-field";

export type StepContentItem = 
  | { id: string; type: "title"; content: string }
  | { id: string; type: "paragraph"; content: string }
  | { id: string; type: "subtitle"; content: string }
  | { id: string; type: "question"; content: string }
  | { id: string; type: "helper-text"; content: string }
  | { 
      id: string; 
      type: "input-field"; 
      heading: string;
      placeholder?: string;
      required?: boolean;
      helperText?: string;
      dotPoints?: string[];
    };

export type AccountSetupStep = {
  id: string;
  stepTitle?: string;
  content: StepContentItem[];
  isFinalStep?: boolean;
  termsContent?: string;
};

export type AccountSetupFormContent = {
  image?: string;
  urlPath: string;
  steps: AccountSetupStep[];
};

export type AccountSetupFormProps = BasePage<AccountSetupFormContent>;

export const accountSetupFormFallbackData: AccountSetupFormProps = {
  title: "Account Setup Form",
  description: "Account setup form configuration",
  slug: "account-setup",
  content: {
    image: "/placeholder.jpg",
    urlPath: "/account-setup",
    steps: [
      {
        id: "step-1",
        stepTitle: "1. Payroll Contact",
        content: [
          {
            id: "content-1",
            type: "title",
            content: "1. Payroll Contact",
          },
          {
            id: "content-2",
            type: "paragraph",
            content: "(Receives payroll setup guides, processing instructions, and adjustments)",
          },
          {
            id: "content-3",
            type: "input-field",
            heading: "Name:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-4",
            type: "input-field",
            heading: "Position:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-5",
            type: "input-field",
            heading: "Email:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-6",
            type: "input-field",
            heading: "Phone:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-7",
            type: "input-field",
            heading: "Mobile:",
            placeholder: "",
            required: false,
          },
        ],
        isFinalStep: false,
      },
      {
        id: "step-2",
        stepTitle: "2. Accounts Contact",
        content: [
          {
            id: "content-8",
            type: "title",
            content: "2. Accounts Contact",
          },
          {
            id: "content-9",
            type: "paragraph",
            content: "(Receives monthly invoices and credit notes)",
          },
          {
            id: "content-10",
            type: "input-field",
            heading: "Name:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-11",
            type: "input-field",
            heading: "Position:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-12",
            type: "input-field",
            heading: "Email:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-13",
            type: "input-field",
            heading: "Phone:",
            placeholder: "",
            required: false,
          },
          {
            id: "content-14",
            type: "input-field",
            heading: "Mobile:",
            placeholder: "",
            required: false,
          },
        ],
        isFinalStep: true,
        termsContent: "Terms and conditions content goes here...",
      },
    ],
  },
};

