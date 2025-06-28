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