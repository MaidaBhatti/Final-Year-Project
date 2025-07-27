import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from '../contexts/AuthContext';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import OptionsScreen from '../screens/OptionsScreen';
import ChatScreen from '../screens/ChatScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import MoodScreen from '../screens/MoodScreen';
import FoodScreen from '../screens/FoodScreen';
import MusicScreen from '../screens/MusicScreen';
import QuestionScreen from '../screens/QuestionScreen';
import BreathingScreen from '../screens/BreathingScreen';
import MedicationScreen from '../screens/MedicationScreen';
import StressReliefScreen from '../screens/StressReliefScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#222',
          width: 280,
        },
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerActiveTintColor: '#f594bd',
        drawerInactiveTintColor: '#fff',
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Options" component={OptionsScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Exercise" component={ExerciseScreen} />
      <Drawer.Screen name="Mood" component={MoodScreen} />
      <Drawer.Screen name="Food" component={FoodScreen} />
      <Drawer.Screen name="Music" component={MusicScreen} />
      <Drawer.Screen name="Questions" component={QuestionScreen} />
      <Drawer.Screen name="Breathing" component={BreathingScreen} />
      <Drawer.Screen name="Medications" component={MedicationScreen} />
      <Drawer.Screen name="StressRelief" component={StressReliefScreen} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AppNavigator must be used within AuthProvider');
  }

  const {isAuthenticated, isLoading} = authContext;

  if (isLoading) {
    return null; // You can add a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;