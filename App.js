import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext'
import Navigation from './src/components/Navigation'

export default function App() {
  return (
    <AuthProvider>
      
        <Navigation/>
  
    </AuthProvider>
  );
}
