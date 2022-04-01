import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

/* -------------------------------------------------------------------------- */
/*                                    THEME                                   */
/* -------------------------------------------------------------------------- */

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ff9900',
        },
    },
});

ReactDOM.render(
<Provider store={ store }>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
</Provider>, 
document.getElementById('root'));


