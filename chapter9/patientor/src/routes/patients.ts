import express from 'express';
import patientRouter from '../services/patientService';
import toNewPatient from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientRouter.getPatientsNoSsn());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const ourPatient = patientRouter.findById(id);
  res.send(ourPatient);
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientRouter.addPatient(newPatient);
    res.json(addedPatient);
  }
  catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;