import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Link, ThemeProvider, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import darkTheme from '../theme'; // Import the custom dark theme

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const Form = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  margin: '40px auto',
  padding: 20,
  backgroundColor: theme.palette.background.paper,
  border: '1px solid #333',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 40,
  marginTop: 20,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ToggleLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.light,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    phoneNumber: '',
    collegeName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isLogin ? '/api/login' : '/api/signup';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/main');
    } else {
      console.error('Failed to authenticate');
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Form>
          <Typography variant="h5" component="h2" className="loginheading">
            {isLogin ? 'Login' : 'Sign Up'}
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  name="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  name="rollNo"
                  label="Roll No"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={formData.rollNo}
                  onChange={handleChange}
                />
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <TextField
                  name="collegeName"
                  label="College Name"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  value={formData.collegeName}
                  onChange={handleChange}
                />
              </>
            )}
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />
            <SubmitButton type="submit">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </SubmitButton>
          </Box>
          <Typography variant="body2" component="p" className="loginpage">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <ToggleLink href="#" onClick={toggleForm}>
                  Sign Up
                </ToggleLink>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <ToggleLink href="#" onClick={toggleForm}>
                  Sign In
                </ToggleLink>
              </>
            )}
          </Typography>
        </Form>
      </Container>
    </ThemeProvider>
  );
};

export default AuthPage;

