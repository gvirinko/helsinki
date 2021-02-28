import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: {[type: string]: Diagnosis}
};

const initialState: State = {
  patients: {},
  diagnoses: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: payload
  }
};

export const updatePatient = (payload: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: payload
  }
};

// export const addEntry = (payload: Patient): Action => {
//   return {
//     type: "ADD_ENTRY",
//     payload: payload
//   }
// };

export const setDiagnosisList = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: payload
  }
};