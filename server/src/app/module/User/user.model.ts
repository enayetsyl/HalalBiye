import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { Gender } from '../../type';



export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  age?: number;
  gender?: Gender;
  religion?: string;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const SALT_ROUNDS = 10;

const UserSchema = new Schema<IUser>(
  {
    email:   { type: String, required: true, unique: true },
    password:{ type: String, required: true },
    name:    String,
    age:     Number,
    gender:  { type: String, enum: ['Male', 'Female', 'Other'] },
    religion:String,
    location:String,
    height:  Number,
    education:String,
    occupation:String,
  },
  { timestamps: true }
);

UserSchema.set('toJSON', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  }
});
UserSchema.set('toObject', {
  transform(doc, ret) {
    delete ret.password;
    return ret;
  }
});
// ——— HASH PASSWORD BEFORE SAVE ———
// Using an async hook means you can omit `next()` entirely and just throw on error.
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});


// ——— INSTANCE HELPER TO COMPARE PASSWORDS ———
UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
