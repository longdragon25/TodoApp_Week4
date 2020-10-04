import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TODOS } from '../utils/data.js';
export default function ActiveScreen() {
  state = {
    todoList: TODOS,
    todoBody: ''
  }
  return (
    <View style={styles.container}>
      <Text>Active Screen</Text>
    </View>
  );
}

ActiveScreen.navigationOptions = {
  title: 'Active todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});