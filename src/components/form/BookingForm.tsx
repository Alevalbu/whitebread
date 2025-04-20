"use client";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "./FormContext";
import Input from "../UI/Input";
import RadioGroup from "../UI/RadioButtonGroup";
import OccupancyCounter from "../UI/OcuppancyCounter";
import React, { useState } from "react";
import Accordion, { AccordionStage } from "../Accordion";
import Select, { SelectOption } from "../UI/Select";
import { LocationEdit } from "lucide-react";

type BookingFormProps = {
  locale: string;
};

const titleOption: SelectOption[] = [
  {
    label: "Mr",
    value: "mr",
  },
  {
    label: "Miss",
    value: "miss",
  },
  {
    label: "Mrs",
    value: "mrs",
  },
  {
    label: "Lord",
    value: "lord",
  },
  {
    label: "Lady",
    value: "lady",
  },
];

const reasonOptions: SelectOption[] = [
  {
    label: "Goverment",
    value: "goverment",
  },
  {
    label: "Associacion",
    value: "associacion",
  },
  {
    label: "Bus Tour",
    value: "bus_tour",
  },
  {
    label: "Charity Event",
    value: "charity_event",
  },
  {
    label: "Graduation/Reunion",
    value: "special_event",
  },
  {
    label: "Layover",
    value: "layover",
  },
];

function BookingFormContactDetails() {
  const t = useTranslations("form");
  const { state, updateField } = useForm();

  return (
    <form noValidate className="space-y-8">
      {/* Personal Information Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t("personal.title")}</h2>
        <div className="space-y-4">
          <Select
            options={titleOption}
            value={state.title}
            variant={state.errors.title ? "error" : "default"}
            error={state.errors.title}
            onChange={(option) => (state.title = option)}
          />
          <Input
            type="text"
            label={t("personal.firstName")}
            required
            value={state.firstName}
            onChange={(value) => {
              updateField("firstName", value);
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
            }}
            error={state.errors.lastName}
          />

          <Input
            type="text"
            label={t("personal.email")}
            required
            value={state.email}
            onChange={(value) => {
              updateField("email", value);
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
            }}
            error={state.errors.phoneNumber}
          />
        </div>
      </section>
    </form>
  );
}

function BookingFormBookingDetails() {
  const t = useTranslations("form");
  const { state, updateField } = useForm();

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

  const travelBusinessOrLeisure = [
    {
      id: "business",
      value: "business",
      label: t("booking.otherPurpose.business"),
    },
    {
      id: "leisure",
      value: "leisure",
      label: t("booking.otherPurpose.leisure"),
    },
  ];

  const packageOptions = [
    {
      id: "breakfast",
      value: "breakfast",
      label: t("booking.packagesTypes.breakfast"),
    },
    {
      id: "meal",
      value: "meal",
      label: t("booking.packagesTypes.mealDeal"),
    },
  ];

  return (
    <form noValidate className="space-y-8">
      <section>
        <div className="space-y-4">
          <label className="block text-black text-lg font-bold mb-2">
            {t("bookingTypeTitle")}
          </label>
          <RadioGroup
            options={travelPurposeOptions}
            name="travelPurpose"
            defaultValue={state.travelPurpose}
            onChange={(value) => {
              updateField("travelPurpose", value);
            }}
          />
          {state.errors.travelPurpose && (
            <p className="mt-1 text-red-500 text-sm">
              {state.errors.travelPurpose}
            </p>
          )}
          <label className="block text-black text-lg font-bold mb-2">
            {t("bookingLeisureBusiness")}
          </label>
          <RadioGroup
            options={travelBusinessOrLeisure}
            name="other travel purposes"
            defaultValue={state.otherPurpose}
            onChange={(value) => {
              updateField("otherPurpose", value);
            }}
          />
          <div className="flex flex-row">
            <input
              type="checkbox"
              checked={state.schoolTrip}
              onChange={(e) => {
                updateField("schoolTrip", e.target.checked);
              }}
            />
            <p className="ml-2">{t("booking.schoolTrip")}</p>
          </div>
          <label className="block text-black text-lg font-bold mb-2">
            {t("booking.reasonTitle")}
          </label>
          <Select
            options={reasonOptions}
            variant="default"
            value={state.reasons}
            onChange={(option) => {
              updateField("reasons", option);
            }}
          />
          <h2>{t("booking.title")}</h2>
          <p>{t("booking.description")}</p>
          <Input
            type="imageText"
            icon={<LocationEdit />}
            value={state.location}
            onChange={(value) => {
              updateField("location", value);
            }}
          />
          <Input
            type="dateRange"
            onDateRangeChange={(start, end) => {
              if (start) updateField("dateRangeStart", start);
              if (end) updateField("dateRangeEnd", end);
            }}
          />
          <h2>{t("booking.packageTitle")}</h2>
          <p>{t("booking.packageDescription")}</p>
          <RadioGroup
            options={packageOptions}
            name="other travel purposes"
            defaultValue={state.package}
            onChange={(value) => {
              updateField("package", value);
            }}
          />
        </div>
      </section>
    </form>
  );
}

function BookingFormRooms() {
  const t = useTranslations("form");
  const { state, updateField, submitForm } = useForm();

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
      <section>
        <div className="space-y-4">
          <h2>{t("rooms.title")}</h2>
          <p>{t("rooms.description")}</p>
          <div className="flex flex-row">
            <input
              type="checkbox"
              checked={state.travellingChildren}
              onChange={(e) =>
                updateField("travellingChildren", e.target.checked)
              }
            />
            <p className="ml-2">{t("rooms.travellingChildren")}</p>
          </div>
          <div className="flex flex-row">
            <input
              type="checkbox"
              checked={state.accesibilityRoom}
              onChange={(e) =>
                updateField("accesibilityRoom", e.target.checked)
              }
            />
            <p className="ml-2">{t("rooms.accesible")}</p>
          </div>
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

          <OccupancyCounter
            title={t("booking.occupancy.twin")}
            description={t("booking.occupancy.twinDes")}
            initialValue={state.twinOccupancy}
            onChange={(value) => updateField("twinOccupancy", value)}
          />
          <div className="flex flex-row">
            <h2 className="mr-2">Total: </h2>
            {state.singleOccupancy +
              state.doubleOccupancy +
              state.twinOccupancy}
            <span className="ml-2">rooms</span>
          </div>
          <h2>{t("rooms.aditionalInformation")}</h2>
          <p>{t("rooms.aditionalDes1")}</p>
          <p>{t("rooms.aditionalDes2")}</p>
          <textarea
            value={state.aditionalInfo}
            onChange={(e) => updateField("aditionalInfo", e.target.value)}
          />
          <button
            type="submit"
            disabled={state.isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
          >
            {state.isSubmitting ? "Submitting..." : t("submit")}
          </button>
        </div>
      </section>
    </form>
  );
}

const formStages: AccordionStage[] = [
  {
    title: "Contact Details",
    content: <BookingFormContactDetails />,
  },
  {
    title: "Booking Details",
    content: <BookingFormBookingDetails />,
  },
  {
    title: "Room requirements",
    content: <BookingFormRooms />,
  },
];

export default function BookingForm({ locale }: BookingFormProps) {
  return (
    <FormProvider locale={locale}>
      <Accordion stages={formStages} />
    </FormProvider>
  );
}
