import React from 'react';
import Dashboard from './pages/Dashboard';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
    palette: {
        primary: { main: "#160C28"},
        secondary: { main: "#D7EAF5" },
        background: { default: "transparent" },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
        h6: { fontWeight: 600 },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 12,
                        background: "rgba(255, 255, 255, 0.9)",
                        "&.Mui-focused": { background: "rgba(255, 255, 255, 1)" },
                    },
                },
            },
        },
    },
});


const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toaster
                position="top-right"
                toastOptions={{
                    success: { style: { background: '#28a745', color: 'white' } },
                    error: { style: { background: '#dc3545', color: 'white' } },
                }}
            />
            <Box sx={{
                minHeight: "100vh",
                background: "#160C28",

                display: 'flex',
                flexDirection: 'column'
            }}>
                <Dashboard />
            </Box>
        </ThemeProvider>
    );
};

export default App;