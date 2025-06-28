import { Schema, Types } from 'mongoose';

export type TRequest = {
  fromUser: Schema.Types.ObjectId;
  toUser: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}
