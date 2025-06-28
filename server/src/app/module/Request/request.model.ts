import { Schema, model, Types } from 'mongoose';
import { TRequest } from '../Request/request.types';

const requestSchema = new Schema<TRequest>(
  {
    fromUser: { type: Types.ObjectId, ref: 'User', required: true },
    toUser: { type: Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

// Optionally, add indexes for performance:
requestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });

export const Request = model<TRequest>('Request', requestSchema);
