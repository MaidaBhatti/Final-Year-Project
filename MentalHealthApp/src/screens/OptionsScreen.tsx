import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES} from '../config/constants';

const OptionsScreen = ({navigation}: any) => {
  const options = [
    {title: 'Talk', screen: 'Chat', icon: '💬'},
    {title: 'Test Yourself', screen: 'Questions', icon: '📝'},
    {title: 'Listen to Music', screen: 'Music', icon: '🎵'},
    {title: 'Exercise Tips', screen: 'Exercise', icon: '💪'},
    {title: 'Food Suggestions', screen: 'Food', icon: '🍎'},
    {title: 'Breathing Exercise', screen: 'Breathing', icon: '🫁'},
    {title: 'Medications', screen: 'Medications', icon: '💊'},
    {title: 'Stress Relief Game', screen: 'StressRelief', icon: '🎮'},
  ];

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>What would you like to do?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => navigation.navigate(option.screen)}>
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text style={styles.optionText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
  },
  content: {
    padding: 20,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1,
  },
});

export default OptionsScreen;