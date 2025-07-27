import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Divider,
  Stack
} from '@mui/material';
import AuthContext from '../../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(email, password);
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
      maxWidth: 450, 
      mx: 'auto', 
      p: 4,
      mt: 8,
      boxShadow: 3,
      borderRadius: 2
    }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome Back
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Sign in to continue to your mental health journey
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          size="large"
          disabled={loading}
          sx={{ py: 1.5, mb: 2 }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 3 }}>
        <Typography variant="body1">
          Don't have an account?
        </Typography>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Typography variant="body1" color="primary" fontWeight="500">
            Sign Up
          </Typography>
        </Link>
      </Stack>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary">
            Forgot your password?
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Login;