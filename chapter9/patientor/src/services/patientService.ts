import patients from '../../data/data_patients';
import { Patient, NewPatient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNoSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: (Math.floor(Math.random() * Math.floor(100))).toString(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addPatient
};