/**
 * Shared TypeScript types for user data, requests, and form component props.
 * @module types
 */

/**
 * Represents a user record in the system.
 */
export type TUser = {
  /** Unique identifier of the user */
  _id: string;
  /** User's email address */
  email: string;
  /** Full name of the user */
  name?: string;
  /** Age of the user */
  age?: number;
  /** Gender of the user */
  gender?: string;
  /** Religion of the user */
  religion?: string;
  /** Location or city of the user */
  location?: string;
  /** Height of the user in centimeters */
  height?: number;
  /** Education level of the user */
  education?: string;
  /** Occupation or job title of the user */
  occupation?: string;
  /** ISO timestamp when the user was created */
  createdAt?: string;
  /** ISO timestamp when the user was last updated */
  updatedAt?: string;
  token?: string;
};

/**
 * Extends TUser with the current connection status between
 * the logged-in user and this profile.
 */
export type TUserProfile = TUser & {
  /** Connection status: none, pending, accepted, or rejected */
  connectionStatus?: "none" | "pending" | "accepted" | "rejected";
};

/**
 * Fields that can be updated on a user profile.
 */
export type TUpdatableProfileFields = {
  /** Full name */
  name?: string;
  /** Age (number) */
  age?: number;
  /** Gender */
  gender?: string;
  /** Religion */
  religion?: string;
  /** Location or city */
  location?: string;
  /** Height in centimeters */
  height?: number;
  /** Education level */
  education?: string;
  /** Occupation or job title */
  occupation?: string;
};

/**
 * A lightweight summary of a user, used for lists and cards.
 */
export type TUserSummary = {
  /** Unique identifier */
  _id: string;
  /** Full name */
  name?: string;
  /** Email address */
  email?: string;
  /** Gender */
  gender?: string;
  /** Religion */
  religion?: string;
  /** Age */
  age?: number;
  /** Location or city */
  location?: string;
  /** Height in centimeters */
  height?: number;
  /** Education level */
  education?: string;
  /** Occupation or job title */
  occupation?: string;
};

/**
 * Represents a connection request between two users,
 * using TUserSummary for nested user data.
 */
export type TUserRequest = {
  /** Unique identifier of the request */
  _id: string;
  /** ID or summary of the requesting user */
  fromUser: string | TUserSummary;
  /** ID or summary of the target user */
  toUser: string | TUserSummary;
  /** Request status */
  status: "pending" | "accepted" | "rejected";
  /** ISO timestamp when the request was created */
  createdAt: string;
  /** ISO timestamp when the request was last updated */
  updatedAt: string;
};

/**
 * Represents a connection request between two users,
 * using full TUser objects for nested user data.
 */
export type TRequest = {
  /** Unique identifier of the request */
  _id: string;
  /** ID or full user object of the requesting user */
  fromUser: string | TUser;
  /** ID or full user object of the target user */
  toUser: string | TUser;
  /** Request status */
  status: "pending" | "accepted" | "rejected";
  /** ISO timestamp when the request was created */
  createdAt: string;
  /** ISO timestamp when the request was last updated */
  updatedAt: string;
};

/**
 * Props for the filter bar component.
 */
export type FilterBarProps = {
  /** Current filter values */
  filters: {
    gender: string;
    religion: string;
  };
  /**
   * Callback when a filter value changes
   * @param name - "gender" or "religion"
   * @param value - New filter value
   */
  onFilterChange: (name: "gender" | "religion", value: string) => void;
};

/**
 * Props for the profile card component in the browse view.
 */
export type ProfileCardProps = {
  /** User data with connection status */
  user: TUserProfile;
  /** ID of the user currently loading (sending request) */
  loadingUserId: string | null;
  /**
   * Callback to send a connection request
   * @param userId - ID of the target user
   */
  onSendRequest: (userId: string) => void;
};

/**
 * Layout props for authentication pages (login/register).
 */
export type AuthLayoutProps = {
  /** Content to display inside the layout */
  children: React.ReactNode;
  /** Optional background image URL */
  backgroundImage?: string;
};

/**
 * Props for the header on authentication pages.
 */
export type AuthHeaderProps = {
  /** Logo image source URL */
  logoSrc: string;
  /** Alt text for the logo */
  logoAlt: string;
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Optional logo size (width and height) */
  logoSize?: number;
};

/**
 * Props for a controlled text input field.
 */
export type TextInputFieldProps = {
  /** Unique input ID */
  id: string;
  /** Form field name */
  name: string;
  /** Label text */
  label: string;
  /** Input type (e.g. "text", "email", "password") */
  type?: string;
  /** Current input value */
  value: string;
  /**
   * Change handler
   * @param e - React change event
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Marks the field as required */
  required?: boolean;
  /** Browser autocomplete attribute */
  autoComplete?: string;
};

/**
 * Props for displaying a single label/value pair.
 */
export type ProfileFieldProps = {
  /** Field label */
  label: string;
  /** Field value (string or number) */
  value: string | number;
};

/**
 * Props for the profile edit form component.
 */
export type ProfileFormProps = {
  /** Current form state */
  form: TUpdatableProfileFields;
  /** Whether the form is currently saving */
  saving: boolean;
  /**
   * Input change handler
   *
   * @param e - The input change event
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Select change handler
   *
   * @param name - One of the form field keys to update
   * @param value - The newly selected value
   */
  onSelect: (name: keyof TUpdatableProfileFields, value: string) => void;
  /**
   * Form submission handler
   *
   * @param e - The form submit event
   */
  onSubmit: (e: React.FormEvent) => void;
};


/**
 * Configuration object for generating form fields dynamically.
 */
export type FieldConfig =
  | {
      /** Key of the updatable profile field */
      name: keyof TUpdatableProfileFields;
      /** Label for the field */
      label: string;
      /** Input type */
      type: "text";
    }
  | {
      name: keyof TUpdatableProfileFields;
      label: string;
      type: "number";
      /** Minimum allowed value */
      min?: number;
      /** Maximum allowed value */
      max?: number;
    }
  | {
      name: keyof TUpdatableProfileFields;
      label: string;
      type: "select";
      /** Options for a select field */
      options: readonly string[];
    };

/**
 * Props for a text input in the registration form.
 */
export type RegisterFormFieldProps = {
  /** Unique input ID */
  id: string;
  /** Field name */
  name: string;
  /** Label text */
  label: string;
  /** Input type */
  type?: string;
  /** Current value */
  value: string;
  /** Marks the field as required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /**
   * Change handler
   * @param e - React change event
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Props for a select dropdown in the registration form.
 */
export type RegisterSelectFieldProps = {
  /** Unique select ID */
  id: string;
  /** Label text */
  label: string;
  /** Current selected value */
  value: string;
  /** Dropdown options */
  options: { value: string; label: string }[];
  /** Placeholder text */
  placeholder?: string;
  /**
   * Value change handler
   * @param value - New selected value
   */
  onChange: (value: string) => void;
};

/**
 * Shape of the registration form values.
 */
export type RegisterFormValues = {
  email: string;
  password: string;
  name: string;
  age: string;
  height: string;
  gender: string;
  religion: string;
  location: string;
  education: string;
  occupation: string;
};

/**
 * Configuration for rendering registration form fields dynamically.
 */
export type RegisterFieldConfig = {
  /** Key of the form value */
  id: keyof RegisterFormValues;
  /** Label text */
  label: string;
  /** Input type */
  type: "text" | "email" | "password" | "number" | "select";
  /** Marks the field as required */
  required?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Options for select type only */
  options?: { value: string; label: string }[];
};

/**
 * Props for the received request card component.
 */
export type ReceivedRequestCardProps = {
  /** Incoming user request */
  request: TUserRequest;
  /** ID of the request currently being responded to */
  actionLoading: string | null;
  /**
   * Response handler
   * @param id - Request ID
   * @param action - "accept" or "decline"
   */
  onRespond: (id: string, action: "accept" | "decline") => void;
};
