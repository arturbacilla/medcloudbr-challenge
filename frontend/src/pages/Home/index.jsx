import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import PatientsTable from '../../components/PatientsTable';
import { requestGet } from '../../services/api';
import parseResult from '../../helpers/parseResult';

function Home() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPatients = async () => {
    const token = localStorage.getItem('token');
    const patientsList = await requestGet('/patients', token);
    if (!Object.values(patientsList).some((key) => key === 'AxiosError')) {
      const { body } = parseResult(patientsList);
      return body;
    }
    return false;
  };

  useEffect(() => {
    fetchPatients().then((data) => {
      if (data) {
        setRows(data);
        setIsLoading(true);
      }
    });
  }, []);

  return (
    <main>
      <Header />
      {
        isLoading ? <span>Loading...</span>
          : (<PatientsTable rows={rows} />)
      }
    </main>
  );
}

export default Home;
