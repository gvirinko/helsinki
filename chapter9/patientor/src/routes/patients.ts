import express from 'express';
import patientRouter from '../services/patientService';
import { NewHealthCheckEntry,  } from '../types';
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

router.get('/:id/entries', (req, res) => {
  const id = req.params.id;
  const ourPatient = patientRouter.findById(id);
  res.send(ourPatient?.entries);
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry: NewHealthCheckEntry = req.body;
    const id = req.params.id;
    const addedPatient = patientRouter.addHealthCheckEntry(newEntry, id);
    res.json(addedPatient);
  }
  catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
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