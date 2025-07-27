import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {COLORS, SIZES} from '../../config/constants';

const SignupScreen = ({navigation}: any) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
  });
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('SignupScreen must be used within AuthProvider');
  }

  const {register} = authContext;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSignup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Registration Failed', result.message || 'Please try again');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Join our mental health community today
          </Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Username *"
              value={formData.username}
              onChangeText={value => handleInputChange('username', value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address *"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password *"
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              value={formData.confirmPassword}
              onChangeText={value => handleInputChange('confirmPassword', value)}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Age"
              value={formData.age}
              onChangeText={value => handleInputChange('age', value)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={formData.gender}
              onChangeText={value => handleInputChange('gender', value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              value={formData.height}
              onChangeText={value => handleInputChange('height', value)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              value={formData.weight}
              onChangeText={value => handleInputChange('weight', value)}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: SIZES.medium,
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.black,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  linkText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SignupScreen;