import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import {COLORS, SIZES} from '../config/constants';

const {width, height} = Dimensions.get('window');

interface Bubble {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  popping: boolean;
}

const StressReliefScreen = ({navigation}: any) => {
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const generateBubble = (): Bubble => {
    const colors = [COLORS.primary, COLORS.secondary, '#a3d8f4', '#e69fa8'];
    return {
      id: Math.random().toString(),
      x: Math.random() * (width - 100),
      y: Math.random() * (height - 300) + 100,
      size: 50 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      popping: false,
    };
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setBubbles(Array.from({length: 6}, generateBubble));
  };

  const popBubble = (id: string) => {
    if (!gameActive) return;
    
    setBubbles(prev =>
      prev.map(bubble =>
        bubble.id === id ? {...bubble, popping: true} : bubble
      )
    );
    
    setScore(prev => prev + 1);
    
    setTimeout(() => {
      setBubbles(prev =>
        prev.map(bubble =>
          bubble.id === id ? generateBubble() : bubble
        )
      );
    }, 200);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const BubbleComponent = ({bubble}: {bubble: Bubble}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      if (bubble.popping) {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, [bubble.popping, scaleAnim]);

    return (
      <Animated.View
        style={[
          styles.bubble,
          {
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <TouchableOpacity
          style={styles.bubbleTouchable}
          onPress={() => popBubble(bubble.id)}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stress Relief Game</Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.gameInfo}>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <Text style={styles.timeText}>Time: {timeLeft}s</Text>
        </View>

        {gameActive ? (
          <View style={styles.bubblesContainer}>
            {bubbles.map(bubble => (
              <BubbleComponent key={bubble.id} bubble={bubble} />
            ))}
          </View>
        ) : (
          <View style={styles.startContainer}>
            <Text style={styles.gameTitle}>Pop the Bubbles!</Text>
            {timeLeft === 0 && (
              <Text style={styles.finalScore}>Final Score: {score}</Text>
            )}
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>
                {timeLeft === 0 ? 'Play Again' : 'Start Game'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  scoreText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  timeText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  bubblesContainer: {
    flex: 1,
    position: 'relative',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bubbleTouchable: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gameTitle: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  finalScore: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
});

export default StressReliefScreen;