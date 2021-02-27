import React from "react";
import HealthCheckDetails from "../components/HealthCheckDetails";
import HospitalDetails from "../components/HospitalDetails";
import OccupationalHealthcareDetails from "../components/OccupationalHealthcareDetails";
import {Entry} from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case "Hospital":
      return (<HospitalDetails entry={entry} />);
    case "OccupationalHealthcare":
      return (<OccupationalHealthcareDetails entry={ entry }/>);
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
