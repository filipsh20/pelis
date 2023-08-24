import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [username, setsUsername] = useState("");
  const [sended, setSended] = useState("")

  const handleUsername = (event) => {
    setsUsername(event.target.value);
  }

  const handleSend = (event) => {
    setSended(username)
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput style={styles.input} onChange={handleUsername} value={username} placeholder='Create a username' />
        <Button title='Send formulary' onPress={handleSend} color='grey'/>
        <Text>{sended}</Text>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    height: '200px',
    width: '400px',
    borderWidth: 2,
    borderColor: 'black'
  }
});
