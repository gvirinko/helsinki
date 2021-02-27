import React from "react";
import { Segment } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <p className="ui header">{entry.date} <i className="user md icon large" /></p>
        <p>Employer: {entry.employerName}</p>
      <p className="ui disabled header">{entry.description}</p>
      <p>Sick Leave: {entry.sickLeave ? "yes" : "no"}</p>
    </Segment>
  );
};

export default OccupationalHealthcareDetails;
