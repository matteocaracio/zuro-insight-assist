
import React from 'react';
import PatientHeader from './PatientHeader';
import PatientSearch from './PatientSearch';
import PatientDetails from './PatientDetails';
import PatientsList from './PatientsList';
import { usePatientDatabase } from '@/hooks/usePatientDatabase';

const PatientDatabase = () => {
  const {
    patients,
    searchCPF,
    setSearchCPF,
    currentPatient,
    setCurrentPatient,
    newNote,
    setNewNote,
    searchTerm,
    setSearchTerm,
    aiAnalysis,
    loadingAI,
    patientNotes,
    setPatientNotes,
    selectedPatientForNotes,
    filteredPatients,
    handleAddNote,
    handleUploadFile,
    handleGenerateAIRecommendations,
    handleOpenNotes,
    handleSaveNotes,
    handleDeletePatient
  } = usePatientDatabase();

  return (
    <div className="space-y-8">
      <PatientHeader />
      
      <PatientSearch 
        searchCPF={searchCPF} 
        setSearchCPF={setSearchCPF} 
        setCurrentPatient={setCurrentPatient} 
        patients={patients} 
      />
      
      {currentPatient && (
        <PatientDetails 
          patient={currentPatient}
          newNote={newNote}
          setNewNote={setNewNote}
          handleAddNote={handleAddNote}
          handleUploadFile={handleUploadFile}
          aiAnalysis={aiAnalysis}
          loadingAI={loadingAI}
          handleGenerateAIRecommendations={handleGenerateAIRecommendations}
        />
      )}
      
      <PatientsList 
        patients={patients}
        filteredPatients={filteredPatients}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPatient={setCurrentPatient}
        handleDeletePatient={handleDeletePatient}
        patientNotes={patientNotes}
        setPatientNotes={setPatientNotes}
        handleOpenNotes={handleOpenNotes}
        handleSaveNotes={handleSaveNotes}
        selectedPatientForNotes={selectedPatientForNotes}
      />
    </div>
  );
};

export default PatientDatabase;
