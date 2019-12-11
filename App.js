import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { bold } from 'ansi-colors';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>Studying ReactNative!</Text>
        <Text style={styles.postDescription}>Lorem ipsum sit dolot amet...!</Text>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>Studying ReactNative!</Text>
        <Text style={styles.postDescription}>Lorem ipsum sit dolot amet...!</Text>
      </View>

      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>Studying ReactNative!</Text>
        <Text style={styles.postDescription}>Lorem ipsum sit dolot amet...!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333'
  },

  postContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    margin: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 3
  },

  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },

  postDescription: {
    color: "#666"
  },
});
