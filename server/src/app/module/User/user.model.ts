import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { Gender } from '../../type';

/**
 * Interface representing a User document in MongoDB.
 * Extends Mongoose's Document to include timestamp fields.
 */
export interface IUser extends Document {
  /** User’s unique email address */
  email: string;
  /** Hashed password */
  password: string;
  /** Optional full name */
  name?: string;
  /** Optional age in years */
  age?: number;
  /** Optional gender ('Male' | 'Female' | 'Other') */
  gender?: Gender;
  /** Optional religion */
  religion?: string;
  /** Optional location (city, country, etc.) */
  location?: string;
  /** Optional height in centimeters */
  height?: number;
  /** Optional education level or degree */
  education?: string;
  /** Optional occupation or job title */
  occupation?: string;
  /** When the document was created */
  createdAt: Date;
  /** When the document was last updated */
  updatedAt: Date;

  /**
   * Compare a plain-text candidate password against the stored hash.
   * @param candidate - The plain-text password to verify.
   * @returns Resolves to true if the password matches, false otherwise.
   */
  comparePassword(candidate: string): Promise<boolean>;
}

/** Number of salt rounds for bcrypt hashing */
const SALT_ROUNDS = 10;

/**
 * Mongoose schema defining the shape of User documents.
 * Includes email, password, and various optional profile fields.
 */
const UserSchema = new Schema<IUser>(
  {
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name:     String,
    age:      Number,
    gender:   { type: String, enum: ['Male', 'Female', 'Other'] },
    religion: String,
    location: String,
    height:   Number,
    education:String,
    occupation:String,
  },
  { timestamps: true }  // Automatically add createdAt and updatedAt
);

/**
 * Remove the password field when converting a document to JSON.
 */
UserSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  }
});

/**
 * Remove the password field when converting a document to a plain object.
 */
UserSchema.set('toObject', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  }
});

// ——— HASH PASSWORD BEFORE SAVE ———
/**
 * Pre-save hook: hashes the password if it has been modified.
 */
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

// ——— INSTANCE HELPER TO COMPARE PASSWORDS ———
/**
 * Compare a candidate password to the stored hash.
 * This is available on IUser instances.
 */
UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

/** Mongoose Model for interacting with User documents */
export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
