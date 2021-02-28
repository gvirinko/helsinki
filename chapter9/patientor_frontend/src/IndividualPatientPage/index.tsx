import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal"
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const IndividualPatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(newEntry);
      patients[id].entries?.push(newEntry);
      dispatch(updatePatient(patients[id]));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default IndividualPatientPage;
