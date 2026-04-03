import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
  {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  { timestamps: true }
);

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    center: { type: mongoose.Schema.Types.ObjectId, ref: 'BowlingCenter', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['DRAFT', 'UPCOMING', 'LIVE', 'COMPLETED'],
      default: 'DRAFT'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    registeredPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bids: [bidSchema],
    entryFeeInr: { type: Number, default: 0 },
    upiVpa: String
  },
  { timestamps: true }
);

export const Tournament = mongoose.model('Tournament', tournamentSchema);
