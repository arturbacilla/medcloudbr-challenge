import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PatientsContext from './PatientsContext';

export default function PatientsProvider({ children }) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPatientInfo, setNewPatientInfo] = useState({});
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const values = {
    isAddingNew,
    setIsAddingNew,
    isEditing,
    setIsEditing,
    newPatientInfo,
    setNewPatientInfo,
  };
  return (
    <main>
      <PatientsContext.Provider value={values}>
        { children }
      </PatientsContext.Provider>
    </main>
  );
}

PatientsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
