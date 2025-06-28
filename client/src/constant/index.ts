import { FieldConfig, RegisterFieldConfig } from "@/types";

/**
 * Options for gender selection used in filters and forms.
 * Each option has a `value` sent to the API and a human-readable `label`.
 */
export const genderOptions = [
  { value: "all", label: "All" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

/**
 * Options for religion selection used in filters and forms.
 * Each option has a `value` sent to the API and a human-readable `label`.
 */
export const religionOptions = [
  { value: "all", label: "All" },
  { value: "Islam", label: "Islam" },
  { value: "Christianity", label: "Christianity" },
  { value: "Hinduism", label: "Hinduism" },
  { value: "Other", label: "Other" },
];

/**
 * Configuration for profile fields in both display and edit contexts.
 * @type {FieldConfig[]}
 * @property {string} name – the key in the data model
 * @property {string} label – text shown to users
 * @property {"text"|"number"|"select"} type – input type
 * @property {number} [min] – minimum value for number inputs
 * @property {number} [max] – maximum value for number inputs
 * @property {string[]} [options] – allowed values for select inputs
 */
export const fieldConfigs: FieldConfig[] = [
  { name: "name",       label: "Name",         type: "text" },
  { name: "age",        label: "Age",          type: "number", min: 18 },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  { name: "religion",   label: "Religion",     type: "text" },
  { name: "location",   label: "Location",     type: "text" },
  {
    name: "height",
    label: "Height (cm)",
    type: "number",
    min: 100,
    max: 250,
  },
  { name: "education",  label: "Education",    type: "text" },
  { name: "occupation", label: "Occupation",   type: "text" },
];

/**
 * Configuration for the registration form fields.
 * @type {RegisterFieldConfig[]}
 * @property {string} id – form input identifier and name
 * @property {string} label – text shown above the input
 * @property {"text"|"email"|"password"|"number"|"select"} type – HTML input type
 * @property {boolean} [required] – whether the field is mandatory
 * @property {string} [placeholder] – placeholder text for inputs
 * @property {{ value: string; label: string }[]} [options] – select dropdown options
 */
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

/**
 * Main navigation links for the application header and mobile sheet.
 * Each link has a `href` for routing and a `label` for display.
 */
export const navLinks = [
  { href: "/browse",   label: "Browse"     },
  { href: "/profile",  label: "My Profile" },
  { href: "/requests", label: "Requests"   },
];
