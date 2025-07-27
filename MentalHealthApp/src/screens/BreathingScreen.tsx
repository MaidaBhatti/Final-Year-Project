import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import {COLORS, SIZES} from '../config/constants';

const phases = [
  {label: 'Inhale', duration: 4000, color: COLORS.primary},
  {label: 'Hold', duration: 2000, color: COLORS.secondary},
  {label: 'Exhale', duration: 4000, color: '#a3d8f4'},
  {label: 'Hold', duration: 2000, color: COLORS.secondary},
];

const BreathingScreen = ({navigation}: any) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    if (!isActive) return;

    setProgress(0);
    const {duration} = phases[phaseIndex];
    const start = Date.now();

    // Animate circle
    const targetScale = phases[phaseIndex].label === 'Inhale' ? 1.5 : phases[phaseIndex].label === 'Exhale' ? 0.7 : 1;
    Animated.timing(scaleAnim, {
      toValue: targetScale,
      duration: duration,
      useNativeDriver: true,
    }).start();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / duration, 1));
      
      if (elapsed >= duration) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        
        setTimeout(() => {
          if (phaseIndex === phases.length - 1) {
            setCycleCount(prev => prev + 1);
            setPhaseIndex(0);
          } else {
            setPhaseIndex(prev => prev + 1);
          }
        }, 100);
      }
    }, 16);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [phaseIndex, isActive, scaleAnim]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhaseIndex(0);
      setProgress(0);
    }
  };

  const resetCycles = () => {
    setCycleCount(0);
    setIsActive(false);
    setPhaseIndex(0);
    setProgress(0);
    scaleAnim.setValue(1);
  };

  const currentPhase = phases[phaseIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercise</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.cycleText}>
          Cycles completed: <Text style={styles.cycleNumber}>{cycleCount}</Text>
        </Text>

        <View style={styles.breathingArea}>
          <Animated.View
            style={[
              styles.circle,
              {
                backgroundColor: currentPhase.color,
                transform: [{scale: scaleAnim}],
              },
            ]}>
            <Text style={styles.phaseText}>{currentPhase.label}</Text>
          </Animated.View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, isActive && styles.stopButton]}
            onPress={toggleBreathing}>
            <Text style={styles.buttonText}>
              {isActive ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={resetCycles}>
            <Text style={styles.buttonText}>Reset Cycles</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cycleText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: 40,
  },
  cycleNumber: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  breathingArea: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    marginBottom: 40,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  phaseText: {
    color: COLORS.white,
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  controls: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 120,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: COLORS.error,
  },
  resetButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default BreathingScreen;