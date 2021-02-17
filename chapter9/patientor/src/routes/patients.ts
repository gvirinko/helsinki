import express from 'express';
import patientRouter from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientRouter.getPatientsNoSsn());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientRouter.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation}
  );
  res.json(newPatientEntry);
});

export default router;