import patients from '../../data/data_patients';
import { Patient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNoSsn = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getPatients,
  getPatientsNoSsn
};