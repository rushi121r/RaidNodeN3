import mongoose from 'mongoose';

const frameSchema = new mongoose.Schema(
  {
    frameNumber: { type: Number, required: true },
    roll1: { type: Number, min: 0, max: 10 },
    roll2: { type: Number, min: 0, max: 10 },
    roll3: { type: Number, min: 0, max: 10 },
    score: { type: Number, min: 0, max: 30 }
  },
  { _id: false }
);

const gameSchema = new mongoose.Schema(
  {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    center: { type: mongoose.Schema.Types.ObjectId, ref: 'BowlingCenter' },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
    playedAt: { type: Date, default: Date.now },
    source: { type: String, enum: ['MANUAL', 'SYSTEM_IMPORT'], default: 'MANUAL' },
    frames: { type: [frameSchema], required: true },
    totalScore: { type: Number, required: true },
    strikeCount: { type: Number, default: 0 },
    spareCount: { type: Number, default: 0 },
    splitCount: { type: Number, default: 0 },
    metadata: {
      lane: Number,
      oilPattern: String
    }
  },
  { timestamps: true }
);

export const Game = mongoose.model('Game', gameSchema);
