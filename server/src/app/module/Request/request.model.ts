import { Schema, model, Types } from 'mongoose';
import { TRequest } from '../Request/request.types';

/**
 * Mongoose schema definition for a connection request between two users.
 *
 * Each request document tracks:
 * - who sent the request (`fromUser`)
 * - who received the request (`toUser`)
 * - the current status of the request (`status`)
 * 
 * Timestamps (`createdAt`, `updatedAt`) are managed automatically.
 */
const requestSchema = new Schema<TRequest>(
  {
    /**
     * ObjectId reference to the User who initiated the connection request.
     */
    fromUser: { 
      type: Types.ObjectId, 
      ref: 'User', 
      required: true 
    },

    /**
     * ObjectId reference to the User who is the target of the connection request.
     */
    toUser: { 
      type: Types.ObjectId, 
      ref: 'User', 
      required: true 
    },

    /**
     * Status of the request:
     * - "pending"  : request has been sent but not yet responded to
     * - "accepted" : recipient approved the connection
     * - "rejected" : recipient declined the connection
     * 
     * Defaults to "pending" for new requests.
     */
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    }
  },
  {
    // Automatically adds `createdAt` and `updatedAt` Date fields
    timestamps: true
  }
);

/**
 * Add a unique compound index on (fromUser, toUser) to prevent
 * duplicate requests between the same two users.
 */
requestSchema.index(
  { fromUser: 1, toUser: 1 },
  { unique: true }
);

/**
 * Request model based on the `requestSchema`.
 * 
 * Use this model to create, query, and update connection requests.
 */
export const Request = model<TRequest>(
  'Request',
  requestSchema
);
