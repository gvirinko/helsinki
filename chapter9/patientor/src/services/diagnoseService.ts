import diagnoses from '../../data/data_diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

export default { getDiagnoses };