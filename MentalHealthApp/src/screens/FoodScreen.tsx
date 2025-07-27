import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES} from '../config/constants';

const FoodScreen = ({navigation}: any) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Suggestions</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon!</Text>
        <Text style={styles.description}>
          Healthy food suggestions will be available here.
        </Text>
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
  comingSoon: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  description: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default FoodScreen;