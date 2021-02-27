import React from "react";
import { Segment } from "semantic-ui-react";

import { HealthCheckEntry } from "../types";

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let heartColor;
  switch (entry.healthCheckRating) {
    case 0:
      heartColor = 'green';
      break;
    case 1:
      heartColor = 'orange';
      break;
    case 2:
      heartColor = 'yellow';
      break;
    case 3:
      heartColor = 'red';
      break;
    default:
      break;
  }
  return (
    <Segment>
      <p className="ui header">{entry.date} <i className="stethoscope icon large" /></p>
      <p className="ui disabled header">{entry.description}</p>
      <i className={`heart icon ${heartColor} large`} />
    </Segment>
  );
};

export default HealthCheckDetails;
