"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    fromUser: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });
// Optionally, add indexes for performance:
requestSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });
exports.Request = (0, mongoose_1.model)('Request', requestSchema);
