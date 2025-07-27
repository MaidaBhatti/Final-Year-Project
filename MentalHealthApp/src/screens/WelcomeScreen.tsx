import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {COLORS, SIZES} from '../config/constants';

const WelcomeScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>Time to meditate</Text>
        <Text style={styles.subtitle}>Take a breath, and ease your mind</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: COLORS.black,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;