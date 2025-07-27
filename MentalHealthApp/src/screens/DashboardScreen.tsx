import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {COLORS, SIZES} from '../config/constants';

const DashboardScreen = ({navigation}: any) => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (!authContext) return null;

  const {user} = authContext;

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.userCard}>
            <Image
              source={{
                uri: user?.image || 'https://ui-avatars.com/api/?name=User',
              }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{user?.username || 'Guest'}</Text>
            {user?.height && (
              <Text style={styles.userInfo}>Height: {user.height} cm</Text>
            )}
            {user?.weight && (
              <Text style={styles.userInfo}>Weight: {user.weight} kg</Text>
            )}
            {user?.gender && (
              <Text style={styles.userInfo}>Gender: {user.gender}</Text>
            )}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
    maxWidth: 350,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  username: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  userInfo: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 5,
  },
});

export default DashboardScreen;