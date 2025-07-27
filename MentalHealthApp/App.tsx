import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import {COLORS} from './src/config/constants';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;