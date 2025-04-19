"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

export type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  travelPurpose: string;
  singleOccupancy: number;
  doubleOccupancy: number;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  travelPurpose: "",
  singleOccupancy: 0,
  doubleOccupancy: 0,
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
};

type FormAction =
  | { type: "UPDATE_FIELD"; field: string; value: string | number }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "START_SUBMIT" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; errors: Record<string, string> }
  | { type: "RESET_FORM" };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "START_SUBMIT":
      return {
        ...state,
        isSubmitting: true,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        errors: {},
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        errors: action.errors,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

type FormContextType = {
  state: FormState;
  updateField: (field: string, value: string | number) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const [state, dispach] = useReducer(formReducer, initialState);

  const updateField = (field: string, value: string | number) => {
    dispach({ type: "UPDATE_FIELD", field, value });
  };

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!state.firstName)
      errors.firstName =
        locale === "de"
          ? "Dieses Feld ist erforderlich"
          : "This field is required";
    if (!state.lastName)
      errors.lastName =
        locale === "de"
          ? "Dieses Feld ist erforderlich"
          : "This field is required";

    if (!state.email) {
      errors.email =
        locale === "de"
          ? "Dieses Feld ist erforderlich"
          : "This field is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email =
        locale === "de"
          ? "Bitte geben Sie eine gültige E-Mail-Adresse ein"
          : "Please enter a valid email address";
    }

    if (
      !state.phoneNumber &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        state.phoneNumber
      )
    ) {
      errors.phoneNumber =
        locale === "de"
          ? "Bitte geben Sie eine gültige Telefonnummer ein"
          : "Please enter a valid phone number";
    }

    if (!state.travelPurpose) {
      errors.travelPurpose =
        locale === "de"
          ? "Bitte wählen Sie einen Reisezweck"
          : "Please select a travel purpose";
    }

    return errors;
  };

  const submitForm = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      dispach({ type: "SET_ERRORS", errors });
      return;
    }

    dispach({ type: "START_SUBMIT" });

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phoneNumber: state.phoneNumber,
          travelPurpose: state.travelPurpose,
          singleOccupancy: state.singleOccupancy,
          doubleOccupancy: state.doubleOccupancy,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispach({
          type: "SUBMIT_ERROR",
          errors: data.errors || { form: data.message || "Submission failed" },
        });
      } else {
        dispach({ type: "SUBMIT_SUCCESS" });
      }
    } catch (error) {
      dispach({
        type: "SUBMIT_ERROR",
        errors: { form: "An unexpected error occurred. Please try again." },
      });
    }
  };

  const resetForm = () => {
    dispach({type: 'RESET_FORM'});
  }

  return (
    <FormContext.Provider value={{state, updateField, submitForm, resetForm}}>
        {children}
    </FormContext.Provider>
  )
}

export function useForm() {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useForm must be within a Form Provider');
    }
    return context;
}
