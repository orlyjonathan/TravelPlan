import express from 'express';
import { register } from '../../controllers/clients/setClients';
import { login } from '../../controllers/clients/setClients';
const router = express.Router();



router.post("/register", register);
router.post("/login", login);

export default router;