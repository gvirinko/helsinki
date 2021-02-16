import express from 'express';
import patientRouter from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientRouter.getPatientsNoSsn());
});

export default router;