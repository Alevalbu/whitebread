"use client";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "./FormContext";
import Input from "../UI/Input";
import RadioGroup from "../UI/RadioButtonGroup";
import OccupancyCounter from "../UI/OcuppancyCounter";
import React, { useState } from "react";
import Accordion, { AccordionStage } from "../Accordion";

type BookingFormProps = {
  locale: string;
};

function BookingFormContent() {
  const t = useTranslations("form");
  const { state, updateField, submitForm } = useForm();
  const [formProgress, setFormProgress] = useState(0);

  const calculateProgress = () => {
    const fields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "travelPurpose",
    ];
    const filledFields = fields.filter((field) =>
      Boolean(state[field as keyof typeof state])
    ).length;
    setFormProgress(Math.round((filledFields / fields.length) * 100));
  };

  const travelPurposeOptions = [
    {
      id: "personal",
      value: "personal",
      label: t("booking.purposeOptions.personal"),
    },
    {
      id: "business",
      value: "business",
      label: t("booking.purposeOptions.business"),
    },
    { id: "tmc", value: "tmc", label: t("booking.purposeOptions.tmc") },
    { id: "agent", value: "agent", label: t("booking.purposeOptions.agent") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  if (state.isSubmitted) {
    return (
      <div className="p-6 bg-green-50 text-green-700 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Success!</h2>
        <p>Your booking has been submitted.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Form Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${formProgress}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={formProgress}
          role="progressbar"
        ></div>
      </div>

      {/* Personal Information Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t("personal.title")}</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label={t("personal.firstName")}
              required
              value={state.firstName}
              onChange={(value) => {
                updateField("firstName", value);
                calculateProgress();
              }}
              error={state.errors.firstName}
            />

            <Input
              type="text"
              label={t("personal.lastName")}
              required
              value={state.lastName}
              onChange={(value) => {
                updateField("lastName", value);
                calculateProgress();
              }}
              error={state.errors.lastName}
            />
          </div>

          <Input
            type="text"
            label={t("personal.email")}
            required
            value={state.email}
            onChange={(value) => {
              updateField("email", value);
              calculateProgress();
            }}
            error={state.errors.email}
          />

          <Input
            type="phone"
            label={t("personal.phone")}
            countryCode="+44"
            value={state.phoneNumber}
            onChange={(value) => {
              updateField("phoneNumber", value);
              calculateProgress();
            }}
            error={state.errors.phoneNumber}
          />
        </div>
      </section>

      {/* Booking Details Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t("booking.title")}</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t("booking.purpose")}
            </label>
            <RadioGroup
              options={travelPurposeOptions}
              name="travelPurpose"
              onChange={(value) => {
                updateField("travelPurpose", value);
                calculateProgress();
              }}
            />
            {state.errors.travelPurpose && (
              <p className="mt-1 text-red-500 text-sm">
                {state.errors.travelPurpose}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <OccupancyCounter
              title={t("booking.occupancy.single")}
              description={t("booking.occupancy.singleDesc")}
              initialValue={state.singleOccupancy}
              onChange={(value) => updateField("singleOccupancy", value)}
            />

            <OccupancyCounter
              title={t("booking.occupancy.double")}
              description={t("booking.occupancy.doubleDesc")}
              initialValue={state.doubleOccupancy}
              onChange={(value) => updateField("doubleOccupancy", value)}
            />
          </div>
        </div>
      </section>

      {/* Error message area */}
      {state.errors.form && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {state.errors.form}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state.isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
      >
        {state.isSubmitting ? "Submitting..." : t("submit")}
      </button>
    </form>
  );
}

const formStages: AccordionStage[] = [{
    title: 'Contact Details',
    content: <BookingFormContent />
}]

export default function BookingForm({locale}: BookingFormProps) {
    return (
        <FormProvider locale={locale}>
            <Accordion stages={formStages}/>
        </FormProvider>
    )
}
