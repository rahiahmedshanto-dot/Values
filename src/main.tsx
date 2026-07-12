import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { AuthProvider } from './lib/auth';
import App from './App';
import './index.css';

document.documentElement.classList.remove('light', 'dark', 'auto');
document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PorscheDesignSystemProvider theme="dark">
      <AuthProvider>
        <App />
      </AuthProvider>
    </PorscheDesignSystemProvider>
  </StrictMode>
);
