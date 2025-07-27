import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {AuthContext} from '../contexts/AuthContext';
import {COLORS, SIZES} from '../config/constants';

const CustomDrawerContent = (props: any) => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) return null;
  
  const {user, logout} = authContext;

  const menuItems = [
    {name: 'Dashboard', screen: 'Dashboard'},
    {name: 'Options', screen: 'Options'},
    {name: 'Chat', screen: 'Chat'},
    {name: 'Exercise', screen: 'Exercise'},
    {name: 'Mood', screen: 'Mood'},
    {name: 'Food', screen: 'Food'},
    {name: 'Music Player', screen: 'Music'},
    {name: 'Questions', screen: 'Questions'},
    {name: 'Breathing', screen: 'Breathing'},
    {name: 'Medications', screen: 'Medications'},
    {name: 'Stress Relief', screen: 'StressRelief'},
  ];

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <Image
            source={{
              uri: user?.image || 'https://ui-avatars.com/api/?name=User',
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>
            {user?.username || 'Guest'}
          </Text>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => props.navigation.navigate(item.screen)}>
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  userSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  username: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
  menuSection: {
    paddingVertical: 20,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  logoutSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;