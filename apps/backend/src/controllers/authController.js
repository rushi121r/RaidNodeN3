import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { User } from '../models/User.js';
import { signToken } from '../utils/jwt.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  city: z.string().default('Ahmedabad'),
  role: z.enum(['ADMIN', 'PLAYER', 'CENTER_MANAGER']).optional()
});

export async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid registration payload', errors: parsed.error.flatten() });
  }

  const { name, email, password, city, role } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, city, role });

  const token = signToken({ userId: user._id, role: user.role });
  return res.status(201).json({ token, user });
}

export async function login(req, res) {
  const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid login payload' });
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ userId: user._id, role: user.role });
  return res.json({ token, user });
}

export async function requestOtp(req, res) {
  const schema = z.object({ email: z.string().email() });
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  const user = await User.findOne({ email: parsed.data.email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
  user.otpCode = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  return res.json({ message: 'OTP sent successfully (stub)', otpPreview: otp });
}

export async function verifyOtp(req, res) {
  const schema = z.object({ email: z.string().email(), otp: z.string().length(6) });
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  const { email, otp } = parsed.data;
  const user = await User.findOne({ email });

  if (!user || user.otpCode !== otp || !user.otpExpiry || user.otpExpiry < new Date()) {
    return res.status(401).json({ message: 'OTP invalid or expired' });
  }

  user.otpCode = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = signToken({ userId: user._id, role: user.role });
  return res.json({ token, user });
}
