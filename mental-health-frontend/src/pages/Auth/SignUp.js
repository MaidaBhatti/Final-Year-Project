import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Grid,
  Divider,
  Stack
} from '@mui/material';
import AuthContext from '../../contexts/AuthContext';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { username, email, password, confirmPassword, age, gender, height, weight } = formData;
      
      const userData = {
        username,
        email,
        password,
        confirmPassword,
        age,
        gender,
        height,
        weight
      };
      
      const result = await register(userData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      p: 4,
      mt: 4,
      boxShadow: 3,
      borderRadius: 2
    }}>
      <Typography variant="h4" gutterBottom align="center">
        Create Your Account
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Join our mental health community today
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="username"
              label="Username"
              variant="outlined"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="gender"
                label="Gender"
                select
                SelectProps={{ native: true }}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="height"
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="weight"
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          size="large"
          disabled={loading}
          sx={{ mt: 3, py: 1.5 }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        <Typography variant="body1">
          Already have an account?
        </Typography>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography variant="body1" color="primary" fontWeight="500">
            Sign In
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}

export default SignUp;