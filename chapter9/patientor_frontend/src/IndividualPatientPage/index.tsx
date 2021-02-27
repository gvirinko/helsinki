import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import {Patient} from "../types";
import EntryDetails from "../EntryDetails";

const IndividualPatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const pat: Patient | undefined = Object.values(patients).find(p => p.id === id);
        if (pat && !pat.ssn) {
          console.log("fetching..");
          const { data: patientWithFullData } = await axios.get(`${apiBaseUrl}/patients/${id}`);
          dispatch(updatePatient(patientWithFullData));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, id, patients]);
  let genderIconClass;
  switch (patients[id].gender) {
    case ("female"):
      genderIconClass = "icon venus";
      break;
    case ("male"):
      genderIconClass = "icon mars";
      break;
    case ("other"):
      genderIconClass = "icon genderless";
      break;
    default:
      genderIconClass = "";
  }
  return (
    <div className="App">
      <Container>
        <h3>{patients[id].name}
          <Icon className={genderIconClass}></Icon>
        </h3>
        <p>SSN: {patients[id].ssn}</p>
        <p>Occupation: {patients[id].occupation}</p>
        <h5>Entries:</h5>
        <div>
          {patients[id].entries?.map((entry, i) =>
            <EntryDetails key={i} entry={entry} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default IndividualPatientPage;
