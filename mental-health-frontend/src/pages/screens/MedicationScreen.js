import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicationScreen = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    axios.get('https://api.fda.gov/drug/label.json?limit=20')
      .then(response => {
        setMedications(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleToggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderMedications = () => {
    return medications.map((medication, index) => (
      <div key={index} style={styles.medicationContainer}>
        <div
          style={styles.medicationHeader}
          onClick={() => handleToggleExpand(index)}
        >
          {medication.openfda?.image_url ? (
            <img
              src={medication.openfda.image_url}
              alt="Medication"
              style={styles.medicationImage}
            />
          ) : (
            <div style={styles.medicationImagePlaceholder} />
          )}
          <span style={styles.medicationName}>
            {medication.openfda?.brand_name?.[0] || 'Unknown Medication'}
          </span>
        </div>
        {expandedIndex === index && (
          <div>
            <div style={styles.medicationInfo}>
              <span style={styles.bold}>Benefits:</span>{' '}
              {medication.indications_and_usage
                ? Array.isArray(medication.indications_and_usage)
                  ? medication.indications_and_usage[0]
                  : medication.indications_and_usage
                : 'No information available'}
            </div>
            <div style={styles.medicationInfo}>
              <span style={styles.bold}>Risks of Overdose:</span>{' '}
              {medication.warnings
                ? Array.isArray(medication.warnings)
                  ? medication.warnings[0]
                  : medication.warnings
                : 'No information available'}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Medications for Mental Health</h2>
      {loading ? (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          <div className="loader" />
          <span>Loading...</span>
        </div>
      ) : (
        <div style={styles.scrollViewContent}>
          {renderMedications()}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: 20,
    backgroundColor: '#FFE5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
    maxWidth: 600,
    margin: '0 auto',
  },
  medicationContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
  },
  medicationHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  medicationImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
    objectFit: 'cover',
    background: '#e0e0e0',
  },
  medicationImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicationInfo: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
};

export default MedicationScreen;
