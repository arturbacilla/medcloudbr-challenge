import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import PatientsTable from '../../components/PatientsTable';
import { requestGet } from '../../services/api';
import parseResult from '../../helpers/parseResult';

function Home() {
  const [rows, setRows] = useState([]);
  const fetchPatients = async () => {
    const token = localStorage.getItem('token');
    const patientsList = await requestGet('/patients', token);
    const { body } = parseResult(patientsList);
    return body;
  };

  useEffect(() => {
    fetchPatients().then((data) => {
      setRows(data);
    });
  }, []);

  return (
    <main>
      <Header />
      <PatientsTable rows={rows} />
    </main>
  );
}

export default Home;
