import diagnoses from '../../data/data_diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnoses;
};

export default { getDiagnoses };