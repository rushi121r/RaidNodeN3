import { Router } from 'express';
import { login, register, requestOtp, verifyOtp } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);

export default router;
