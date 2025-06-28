export type  TUser = {
  _id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: string;
  religion?: string;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
  createdAt?: string;
  updatedAt?: string;
}




export type TUserProfile = TUser & {
  connectionStatus?: "none" | "pending" | "accepted" | "rejected";
};

export type TUpdatableProfileFields = {
  name?: string;
  age?: number;
  gender?: string;
  religion?: string;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
};

export type TUserSummary = {
  _id: string;
  name?: string;
  email?: string;
  gender?: string;
  religion?: string;
  age?: number;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
};

export type TUserRequest = {
  _id: string;
  fromUser: string | TUserSummary;
  toUser: string | TUserSummary;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
};

export type  TRequest = {
  _id: string;
  fromUser: string | TUser;
  toUser: string | TUser;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export type  FilterBarProps = {
  filters: { gender: string; religion: string };
  onFilterChange: (name: "gender" | "religion", value: string) => void;
}

export type ProfileCardProps = {
  user: TUserProfile;
  loadingUserId: string | null;
  onSendRequest: (userId: string) => void;
}

export type  AuthLayoutProps = {
  children: React.ReactNode;
  backgroundImage?: string;
}

export type  AuthHeaderProps = {
  logoSrc: string;
  logoAlt: string;
  title: string;
  subtitle?: string;
  logoSize?: number;
}

export type  TextInputFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}

export type   ProfileFieldProps = {
  label: string;
  value: string | number;
}


export type  ProfileFormProps = { 
  form: TUpdatableProfileFields;
  saving: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export type FieldConfig =
  | {
      name: keyof TUpdatableProfileFields;
      label: string;
      type: "text";
    }
  | {
      name: keyof TUpdatableProfileFields;
      label: string;
      type: "number";
      min?: number;
      max?: number;
    }
  | {
      name: keyof TUpdatableProfileFields;
      label: string;
      type: "select";
      options: readonly string[];
    };

    export type  RegisterFormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type  RegisterSelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
}

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
}

export type RegisterFieldConfig = {
  id: keyof RegisterFormValues;
  label: string;
  type: "text" | "email" | "password" | "number" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[]; // only for select
}