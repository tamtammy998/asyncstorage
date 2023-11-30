// StudentTable.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, StyleSheet, Button } from 'react-native';

const StudentTable = ({ students }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>#</Text>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Course</Text>
          <Text style={styles.headerCell}>Username</Text>
          <Text style={styles.headerCell}>Password</Text>
        </View>
        {students.map((item, index) => (
          <View key={index} style={styles.row} onPress={() => handleRowClick(item)}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.cell}>{item.course}</Text>
            <Text style={styles.cell}>{item.username}</Text>
            <Text style={styles.cell}>{item.password}</Text>
          </View>
        ))}
      </View>
      <Modal visible={selectedStudent !== null} animationType="slide">
        <View style={styles.modal}>
          <Text>Student Details:</Text>
          {selectedStudent && (
            <>
              <Text>{`First Name: ${selectedStudent.firstName}`}</Text>
              <Text>{`Last Name: ${selectedStudent.lastName}`}</Text>
              <Text>{`Course: ${selectedStudent.course}`}</Text>
              <Text>{`Username: ${selectedStudent.username}`}</Text>
              <Text>{`Password: ${selectedStudent.password}`}</Text>
            </>
          )}
          <Button title="Close" onPress={() => setSelectedStudent(null)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudentTable;