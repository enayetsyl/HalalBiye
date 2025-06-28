/**
 * @fileoverview Defines user-related types and interfaces for the HalalBiye frontend,
 * including the core User model, allowed gender values, and types for updating profiles.
 */

/**
 * Allowed gender values for a user.
 */
export type Gender = 'Male' | 'Female' | 'Other';

/**
 * Represents a user in the system.
 */
export interface User {
  /** MongoDB ObjectId as a string */
  _id: string;

  /** Used for login – always stored as a bcrypt hash */
  email: string;
  password: string;

  /** Optional profile fields */
  name?: string;
  age?: number;
  gender?: Gender;
  religion?: string;
  location?: string;
  /** Height in centimeters */
  height?: number;
  education?: string;
  occupation?: string;

  /** Timestamps for record creation and last update */
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Subset of User fields that may be updated via the profile edit form.
 */
export type UpdatableProfileFields = Pick<
  User,
  'name' | 'age' | 'gender' | 'religion' | 'location' | 'height' | 'education' | 'occupation'
>;

/**
 * Partial data payload for updating a user's profile.
 * All fields are optional—only the provided fields will be sent to the API.
 */
export type UpdateProfileData = Partial<UpdatableProfileFields>;
