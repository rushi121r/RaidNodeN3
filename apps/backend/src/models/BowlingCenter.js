import mongoose from 'mongoose';

const bowlingCenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: String,
    lanes: { type: Number, default: 8 },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    brunswickIntegration: {
      enabled: { type: Boolean, default: false },
      apiEndpoint: String,
      apiKeyEncrypted: String
    }
  },
  { timestamps: true }
);

export const BowlingCenter = mongoose.model('BowlingCenter', bowlingCenterSchema);
