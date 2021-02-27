import React from "react";
import { Segment } from "semantic-ui-react";

import { HospitalEntry } from "../types";

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <p className="ui header">{entry.date} <i className="hospital icon large" /></p>
      <p className="ui disabled header">{entry.description}</p>
      <p>Discharged on: {entry.discharge.date}</p>
    </Segment>
  );
};

export default HospitalDetails;
