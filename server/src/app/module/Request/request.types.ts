import { Schema, Types } from 'mongoose';

/**
 * Represents a connection request between two users.
 *
 * @typedef {Object} TRequest
 * @property {Schema.Types.ObjectId} fromUser   - The MongoDB ObjectId of the user who sent the request.
 * @property {Schema.Types.ObjectId} toUser     - The MongoDB ObjectId of the user to whom the request was sent.
 * @property {'pending' | 'accepted' | 'rejected'} status
 *                                             - The current status of the request.
 * @property {Date} [createdAt]                 - Timestamp when the request was created.
 * @property {Date} [updatedAt]                 - Timestamp when the request was last updated.
 */
export type TRequest = {
  fromUser: Schema.Types.ObjectId;
  toUser: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
}
