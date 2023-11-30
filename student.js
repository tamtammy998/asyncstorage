// StudentForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Picker, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentForm = ({ onAddStudent }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [course, setCourse] = useState('BSCS');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddStudent = async () => {
    const newStudent = {
      firstName,
      lastName,
      course,
      username,
      password,
    };

    
    try {
      const existingStudents = JSON.parse(await AsyncStorage.getItem('students')) || [];
      const updatedStudents = [...existingStudents, newStudent];
      await AsyncStorage.setItem('students', JSON.stringify(updatedStudents));
      onAddStudent(updatedStudents);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Picker
        style={styles.input}
        selectedValue={course}
        onValueChange={(value) => setCourse(value)}
      >
        <Picker.Item label="BSCS" value="BSCS" />
        <Picker.Item label="BSIT" value="BSIT" />
        <Picker.Item label="BEED" value="BEED" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="ADD" onPress={handleAddStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default StudentForm;