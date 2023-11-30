// App.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StudentForm from './student';
import StudentTable from './table';

const App = () => {
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const storedStudents = await AsyncStorage.getItem('students');
        if (storedStudents) {
          setStudents(JSON.parse(storedStudents));
        }
      } catch (error) {
        console.error('Error loading students:', error);
      }
    };

    loadStudents();
  }, []);

  const handleAddStudent = (updatedStudents) => {
    setStudents(updatedStudents);
  };

  const handleViewTable = () => {
    setShowTable(true);
  };

  const handleCloseTable = () => {
    setShowTable(false);
  };

  const handleClearTable = async () => {
    
    try {
      await AsyncStorage.removeItem('students');
      setStudents([]);
    } catch (error) {
      console.error('Error clearing students:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <StudentForm onAddStudent={handleAddStudent} />
        <Button title="Clear" onPress={handleClearTable} />
      </View>
      <View style={styles.rightContainer}>
        <Button title="View" onPress={handleViewTable} />
        <Modal visible={showTable} animationType="slide">
          <View style={styles.tableContainer}>
            <StudentTable students={students} />
            <Button title="Close Table" onPress={handleCloseTable} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
  },
  leftContainer: {
    flex: 1, 
    padding: 20,
  },
  rightContainer: {
    flex: 1, 
    padding: 20,
  },
  tableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;