// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Auth/LoginScreen';
import SignUp from './pages/Auth/SignupScreen';
import Options from './pages/OptionsScreen';
import Chat from './pages/Chat/ChatBotScreen';
import DashboardScreen from './pages/DashBoardScreen';
import Welcome from './pages/screens/WelcomeScreen';
import Exercise from './pages/screens/ExerciseTipsScreen';
import Mood from './pages/screens/MoodScreen';
import Food from './pages/screens/FoodScreen';
import Music from './pages/screens/MusicPlayerScreen';
import Question from './pages/screens/QuestionScreen';
import BreathingScreen from './pages/BreathingScreen';
import MainLayout from './components/MainLayout';
import SideDrawer from './components/SideDrawer';
import { AuthContext } from './contexts/AuthContext';
import MedicationScreen from './pages/screens/MedicationScreen';
import StressReliefGame from './pages/screens/StressReliefGame';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SideDrawer /> {/* Always visible */}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Welcome />} />

          {/* Protected routes with side drawer */}
          <Route element={<MainLayout />}>
            <Route path="/dashboardscreen" element={<DashboardScreen />} />
            <Route path="/options" element={<Options />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/food" element={<Food />} />
            <Route path="/musicplayer" element={<Music />} />
            <Route path="/questions" element={<Question />} />
            <Route path="/breathing" element={<BreathingScreen />} />
            <Route path="/medications" element={<MedicationScreen />} />
            <Route path="/stress-relief" element={<StressReliefGame />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;