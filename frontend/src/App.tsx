import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { BusesPage } from './pages/Buses/BusesPage';
import { BusDetailPage } from './pages/Buses/BusDetailPage';
import { PupitresPage } from './pages/Pupitres/PupitresPage';
import { PupitreDetailPage } from './pages/Pupitres/PupitreDetailPage';
import ValidatorsPage from './pages/Validators/ValidatorsPage';
import { ValidatorDetailPage } from './pages/Validators/ValidatorDetailPage';
import { CamerasPage } from './pages/Cameras/CamerasPage';
import { CameraDetailPage } from './pages/Cameras/CameraDetailPage';
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/buses" replace />} />
              <Route path="/buses" element={<BusesPage />} />
              <Route path="/buses/:id" element={<BusDetailPage />} />
              <Route path="/pupitres" element={<PupitresPage />} />
              <Route path="/pupitres/:id" element={<PupitreDetailPage />} />
              <Route path="/validators" element={<ValidatorsPage />} />
              <Route path="/validators/:id" element={<ValidatorDetailPage />} />
              <Route path="/cameras" element={<CamerasPage />} />
              <Route path="/cameras/:id" element={<CameraDetailPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
