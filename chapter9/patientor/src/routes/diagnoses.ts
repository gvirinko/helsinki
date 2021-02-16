import express from 'express';
import diagnoseRouter from '../services/diagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseRouter.getDiagnoses());
});

export default router;