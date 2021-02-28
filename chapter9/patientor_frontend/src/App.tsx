import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setPatientList, setDiagnosisList, useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import IndividualPatientPage from "./IndividualPatientPage";

const App: React.FC = () => {
  const [, dispatchPatients] = useStateValue();
  const [, dispatchDiagnoses] = useStateValue();

  React.useEffect(() => {
    // axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatchPatients(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get(`${apiBaseUrl}/diagnoses`);
        dispatchDiagnoses(setDiagnosisList(diagnosesFromApi));
      }
      catch (e) {
        console.log(e);
      }
    };
    fetchDiagnosisList();
  }, [dispatchPatients, dispatchDiagnoses]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={ ()=> <IndividualPatientPage />}/>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
