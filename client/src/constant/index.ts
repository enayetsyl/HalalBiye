import { FieldConfig, RegisterFieldConfig } from "@/types";

export const genderOptions = [
  { value: "all", label: "All" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const religionOptions = [
  { value: "all", label: "All" },
  { value: "Islam", label: "Islam" },
  { value: "Christianity", label: "Christianity" },
  { value: "Hinduism", label: "Hinduism" },
  { value: "Other", label: "Other" },
];

export const fieldConfigs: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "age", label: "Age", type: "number", min: 18 },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  { name: "religion", label: "Religion", type: "text" },
  { name: "location", label: "Location", type: "text" },
  {
    name: "height",
    label: "Height (cm)",
    type: "number",
    min: 100,
    max: 250,
  },
  { name: "education", label: "Education", type: "text" },
  { name: "occupation", label: "Occupation", type: "text" },
];


export const registerFields: RegisterFieldConfig[] = [
    { id: "email",    label: "Email",    type: "email",    required: true },
    { id: "password", label: "Password", type: "password", required: true },
    { id: "name",     label: "Name",     type: "text",     required: true },
    { id: "age",      label: "Age",      type: "number",   placeholder: "18" },
    {
      id:       "gender",
      label:    "Gender",
      type:     "select",
      options: [
        { value: "Male",   label: "Male"   },
        { value: "Female", label: "Female" },
        { value: "Other",  label: "Other"  },
      ],
    },
    { id: "religion",  label: "Religion",  type: "text" },
    { id: "location",  label: "Location",  type: "text" },
    { id: "height",    label: "Height (cm)", type: "number", placeholder: "100–250" },
    { id: "education", label: "Education", type: "text" },
    { id: "occupation",label: "Occupation",type: "text" },
  ];