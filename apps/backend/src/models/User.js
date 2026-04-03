import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    role: {
      type: String,
      enum: ['ADMIN', 'PLAYER', 'CENTER_MANAGER'],
      default: 'PLAYER'
    },
    city: { type: String, default: 'Ahmedabad' },
    bowlingCenter: { type: mongoose.Schema.Types.ObjectId, ref: 'BowlingCenter' },
    handType: { type: String, enum: ['LEFT', 'RIGHT'], default: 'RIGHT' },
    profilePhotoUrl: String,
    preferredLanguage: { type: String, enum: ['en', 'hi'], default: 'en' },
    badges: [{ type: String }],
    otpCode: String,
    otpExpiry: Date
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
