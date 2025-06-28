
export type Gender = 'Male' | 'Female' | 'Other';

export interface User {
  /** MongoDB ObjectId as a string */
  _id: string;

  /** Used for login – always stored as a bcrypt hash */
  email: string;
  password: string;

  /** Profile fields */
  name?: string;
  age?: number;
  gender?: Gender;
  religion?: string;
  location?: string;
  height?: number;       // in cm,
  education?: string;
  occupation?: string;

  /** Timestamps */
  createdAt?: Date;
  updatedAt?: Date;
}


// Only these fields can be updated
export type UpdatableProfileFields = Pick<
  User,
  'name' | 'age' | 'gender' | 'religion' | 'location' | 'height' | 'education' | 'occupation'
>;

export type UpdateProfileData = Partial<UpdatableProfileFields>;