import patients from '../../data/data_patients';
import { Patient, NewPatient, Entry, NewHealthCheckEntry } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNoSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient && !patient.entries) {
    const updPatient = { ...patient, entries: [] };
    return updPatient;
  }
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: (Math.floor(Math.random() * Math.floor(100))).toString(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addHealthCheckEntry = (entry: NewHealthCheckEntry, patientId: string): Entry | undefined => {
  const newHealthCheckEntry = {
    id: (Math.floor(Math.random() * Math.floor(100))).toString(),
    ...entry
  };
  patients.map(patient => {
    if (patient.id === patientId) {
      if (patient.entries) {
        patient.entries.push(newHealthCheckEntry);
      } else {
        patient.entries = [newHealthCheckEntry];
      }
    }
    return patient;
  });
  const patient = findById(patientId);
  if (patient) {
    return newHealthCheckEntry;
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  getPatientsNoSsn,
  findById,
  addPatient,
  addHealthCheckEntry
};