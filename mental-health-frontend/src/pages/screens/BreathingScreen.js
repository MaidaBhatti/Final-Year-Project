import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breath Practice</Text>
      <Animated.View style={[styles.breathCircle, { transform: [{ scale: breathAnimation }] }]}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC0CB', // Pink background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  breathCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: '25%',
  },
  gif: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  breathText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
  },
  breathCount: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#add8e6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  stopButton: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  breathList: {
    marginTop: 20,
    width: '80%',
  },
  breathItem: {
    fontSize: 16,
    color: '#FFF',
    marginVertical: 5,
  },
});

export default BreathingScreen;