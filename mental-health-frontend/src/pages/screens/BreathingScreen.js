import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Image, Dimensions, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const BreathingScreen = () => {
  const [breaths, setBreaths] = useState(0);
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [breathDurations, setBreathDurations] = useState([]);
  const [sound, setSound] = useState();
  const breathAnimation = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  useEffect(() => {
    if (isStarted) {
      if (timer > 0 && timer % 4 === 0) {
        setIsBreathingIn((prev) => !prev);
        animateTextOpacity();
        if (!isBreathingIn) {
          setBreaths((prevBreaths) => prevBreaths + 1);
          playSound();
          setTimer(0);
          storeBreathingCycle(1); // <-- Add this line
        }
        startBreathAnimation();
      }
    }
  }, [timer, isBreathingIn, isStarted]);

  const handleStart = async () => {
    setIsStarted(true);
    setTimer(0);
    await sound.playAsync();
    startBreathAnimation();
  };

  const handleStop = () => {
    setIsStarted(false);
    setTimer(0);
    setBreaths(0);
    setBreathDurations([]);
    breathAnimation.setValue(1);
    textOpacity.setValue(1);
  };

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/Sounds/inhale.mp3')
    );
    setSound(sound);
  };

  const playSound = async () => {
    try {
      await sound.replayAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const startBreathAnimation = () => {
    Animated.sequence([
      Animated.timing(breathAnimation, {
        toValue: 1.5,
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(breathAnimation, {
        toValue: 0.5,
        duration: 4000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isStarted) {
        startBreathAnimation();
      }
    });
  };

  const animateTextOpacity = () => {
    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderBreathItem = ({ item, index }) => (
    <Text style={styles.breathItem}>
      Breath {index + 1}: {item}s
    </Text>
  );

  const storeBreathingCycle = async (cycles = 1) => {
    try {
      const token = await AsyncStorage.getItem('token'); // Or use SecureStore if you prefer
      await fetch('http://localhost:5000/api/stats/breathing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cycles }),
      });
    } catch (error) {
      console.log('Error storing breathing cycle:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Breath Practice</Text>
        <Animated.View style={[
          styles.breathCircle,
          { 
            transform: [{ scale: breathAnimation }],
            width: width * 0.5,
            height: width * 0.5,
            borderRadius: (width * 0.5) / 2,
            bottom: height * 0.25,
          }
        ]}>
          <Image source={require('../assets/image.gif')} style={styles.gif} />
        </Animated.View>
        <Animated.Text style={[styles.breathText, { opacity: textOpacity }]}>
          {isBreathingIn ? 'Inhale' : 'Exhale'}
        </Animated.Text>
        <Text style={styles.breathCount}>Breaths: {breaths}</Text>
        <TouchableOpacity
          style={[styles.button, isStarted && styles.stopButton]}
          onPress={isStarted ? handleStop : handleStart}
        >
          <Text style={styles.buttonText}>{isStarted ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <FlatList
          data={breathDurations}
          renderItem={renderBreathItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.breathList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFC0CB',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  breathCircle: {
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
    position: 'absolute',
  },
  gif: {
    width: '100%',
    height: '100%',
    borderRadius: 1000, // large value for full roundness
  },
  breathText: {
    fontSize: width * 0.06,
    color: '#FFF',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  breathCount: {
    fontSize: width * 0.05,
    color: '#FFF',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  button: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.15,
    backgroundColor: '#add8e6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  stopButton: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    fontSize: width * 0.045,
    color: '#fff',
  },
  breathList: {
    marginTop: height * 0.02,
    width: '90%',
    alignSelf: 'center',
  },
  breathItem: {
    fontSize: width * 0.04,
    color: '#FFF',
    marginVertical: height * 0.005,
    textAlign: 'center',
  },
});

export default BreathingScreen;