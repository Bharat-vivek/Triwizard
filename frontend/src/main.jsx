import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx';

const theme = extendTheme({
  colors: {
    blue: {
      50: '#E6F7FF',
      100: '#C9E4CA',
      200: '#87CEEB',
      300: '#4682B4',
      400: '#1A1D23',
      500: '#0B0C10',
      600: '#03055B',
      700: '#02055B',
      800: '#01055B',
      900: '#00055B',
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  </React.StrictMode>,
)
